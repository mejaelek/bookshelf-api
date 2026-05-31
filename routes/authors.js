const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} = require('../controllers/authorsController');

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management endpoints
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Retrieve a list of authors
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: nationality
 *         schema: { type: string }
 *       - in: query
 *         name: isActive
 *         schema: { type: boolean }
 *     responses:
 *       200:
 *         description: A paginated list of authors
 */
router.get('/', getAllAuthors);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get a single author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Author object
 *       404:
 *         description: Author not found
 */
router.get('/:id', getAuthorById);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, birthDate, nationality, biography, genres]
 *             properties:
 *               firstName: { type: string, example: "George" }
 *               lastName: { type: string, example: "Orwell" }
 *               email: { type: string, example: "george.orwell@example.com" }
 *               birthDate: { type: string, format: date, example: "1903-06-25" }
 *               nationality: { type: string, example: "British" }
 *               biography: { type: string, example: "English novelist known for political writing..." }
 *               genres: { type: array, items: { type: string }, example: ["Fiction"] }
 *     responses:
 *       201:
 *         description: Author created
 *       401:
 *         description: Unauthorized — login required
 *       400:
 *         description: Validation error
 */
router.post('/', protect, createAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Authors]
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
 *               firstName: { type: string }
 *               biography: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200:
 *         description: Author updated
 *       401:
 *         description: Unauthorized — login required
 *       404:
 *         description: Author not found
 */
router.put('/:id', protect, updateAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Author deleted
 *       401:
 *         description: Unauthorized — login required
 *       404:
 *         description: Author not found
 */
router.delete('/:id', protect, deleteAuthor);

module.exports = router;
