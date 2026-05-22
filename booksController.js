const Book = require('../models/Book');
const Author = require('../models/Author');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getAllBooks = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, genre, language, isAvailable } = req.query;

        const filter = {};
        if (genre) filter.genre = genre;
        if (language) filter.language = new RegExp(language, 'i');
        if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';

        const skip = (Number(page) - 1) * Number(limit);

        const [books, total] = await Promise.all([
            Book.find(filter)
                .populate('author', 'firstName lastName email')
                .skip(skip)
                .limit(Number(limit))
                .sort({ title: 1 }),
            Book.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            data: books,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id).populate('author', 'firstName lastName email nationality');

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({ success: true, data: book });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new book
// @route   POST /api/books
// @access  Public
const createBook = async (req, res, next) => {
    try {
        const { title, author, isbn, genre, publishedYear, language, pageCount, summary, coverImageUrl, rating } =
            req.body;

        if (!title || !author || !isbn || !genre || !publishedYear || !pageCount || !summary) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: title, author, isbn, genre, publishedYear, pageCount, summary',
            });
        }

        // Verify the author exists
        const authorExists = await Author.findById(author);
        if (!authorExists) {
            return res.status(404).json({ success: false, message: 'Author not found — please provide a valid author ID' });
        }

        const book = await Book.create({
            title, author, isbn, genre, publishedYear,
            language: language || 'English',
            pageCount, summary, coverImageUrl, rating,
        });

        const populated = await book.populate('author', 'firstName lastName');

        res.status(201).json({ success: true, data: populated });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Public
const updateBook = async (req, res, next) => {
    try {
        const allowedFields = [
            'title', 'author', 'isbn', 'genre', 'publishedYear',
            'language', 'pageCount', 'summary', 'coverImageUrl', 'rating', 'isAvailable',
        ];

        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: 'No valid fields provided for update' });
        }

        // If author is being updated, verify they exist
        if (updates.author) {
            const authorExists = await Author.findById(updates.author);
            if (!authorExists) {
                return res.status(404).json({ success: false, message: 'Author not found — provide a valid author ID' });
            }
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).populate('author', 'firstName lastName');

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({ success: true, data: book });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Public
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };