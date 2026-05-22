const Author = require('../models/Author');

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
const getAllAuthors = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, nationality, isActive } = req.query;

        const filter = {};
        if (nationality) filter.nationality = new RegExp(nationality, 'i');
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const skip = (Number(page) - 1) * Number(limit);

        const [authors, total] = await Promise.all([
            Author.find(filter).skip(skip).limit(Number(limit)).sort({ lastName: 1 }),
            Author.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            data: authors,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get a single author by ID
// @route   GET /api/authors/:id
// @access  Public
const getAuthorById = async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.id);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found',
            });
        }

        res.status(200).json({ success: true, data: author });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new author
// @route   POST /api/authors
// @access  Public
const createAuthor = async (req, res, next) => {
    try {
        const { firstName, lastName, email, birthDate, nationality, biography, genres, website } =
            req.body;

        if (!firstName || !lastName || !email || !birthDate || !nationality || !biography || !genres) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: firstName, lastName, email, birthDate, nationality, biography, genres',
            });
        }

        const author = await Author.create({
            firstName,
            lastName,
            email,
            birthDate,
            nationality,
            biography,
            genres,
            website,
        });

        res.status(201).json({ success: true, data: author });
    } catch (error) {
        next(error);
    }
};

// @desc    Update an author
// @route   PUT /api/authors/:id
// @access  Public
const updateAuthor = async (req, res, next) => {
    try {
        const allowedFields = [
            'firstName', 'lastName', 'email', 'birthDate',
            'nationality', 'biography', 'genres', 'website', 'isActive',
        ];

        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields provided for update',
            });
        }

        const author = await Author.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        res.status(200).json({ success: true, data: author });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an author
// @route   DELETE /api/authors/:id
// @access  Public
const deleteAuthor = async (req, res, next) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);

        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Author deleted successfully',
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
