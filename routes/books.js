const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/booksController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management endpoints
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *           enum: [Fiction, Non-Fiction, Science Fiction, Fantasy, Mystery, Biography, History, Self-Help, Horror, Romance, Other]
 *       - in: query
 *         name: isAvailable
 *         schema: { type: boolean }
 *     responses:
 *       200:
 *         description: A paginated list of books
 */
router.get('/', getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Book object
 *       404:
 *         description: Book not found
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, isbn, genre, publishedYear, pageCount, summary]
 *             properties:
 *               title: { type: string, example: "Nineteen Eighty-Four" }
 *               author: { type: string, example: "6a1744c5650ac7f4d9ebc32c" }
 *               isbn: { type: string, example: "9780451524935" }
 *               genre: { type: string, enum: [Fiction, Non-Fiction, Science Fiction, Fantasy, Mystery, Biography, History, Self-Help, Horror, Romance, Other] }
 *               publishedYear: { type: integer, example: 1949 }
 *               language: { type: string, example: "English" }
 *               pageCount: { type: integer, example: 328 }
 *               summary: { type: string, example: "A dystopian novel..." }
 *               rating: { type: number, minimum: 0, maximum: 5, example: 4.8 }
 *     responses:
 *       201:
 *         description: Book created
 *       401:
 *         description: Unauthorized — login required
 *       400:
 *         description: Validation error
 */
router.post('/', protect, createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update an existing book
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               rating: { type: number, minimum: 0, maximum: 5 }
 *               isAvailable: { type: boolean }
 *     responses:
 *       200:
 *         description: Book updated
 *       401:
 *         description: Unauthorized — login required
 *       404:
 *         description: Book not found
 */
router.put('/:id', protect, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Book deleted
 *       401:
 *         description: Unauthorized — login required
 *       404:
 *         description: Book not found
 */
router.delete('/:id', protect, deleteBook);

module.exports = router;
