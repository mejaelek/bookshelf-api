const express = require('express');
const router = express.Router();
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
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: Results per page
 *       - in: query
 *         name: nationality
 *         schema: { type: string }
 *         description: Filter by nationality (case-insensitive)
 *       - in: query
 *         name: isActive
 *         schema: { type: boolean }
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: A paginated list of authors
 *       500:
 *         description: Server error
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
 *         description: MongoDB ObjectId of the author
 *     responses:
 *       200:
 *         description: Author object
 *       404:
 *         description: Author not found
 *       400:
 *         description: Invalid ID format
 */
router.get('/:id', getAuthorById);

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
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
 *               email: { type: string, format: email, example: "george.orwell@example.com" }
 *               birthDate: { type: string, format: date, example: "1903-06-25" }
 *               nationality: { type: string, example: "British" }
 *               biography: { type: string, example: "Eric Arthur Blair, known by his pen name George Orwell..." }
 *               genres: { type: array, items: { type: string }, example: ["Fiction", "Political Satire"] }
 *               website: { type: string, example: "https://georgeorwell.org" }
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post('/', createAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     tags: [Authors]
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
 *               lastName: { type: string }
 *               biography: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Validation error or no fields provided
 *       404:
 *         description: Author not found
 */
router.put('/:id', updateAuthor);

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 */
router.delete('/:id', deleteAuthor);

module.exports = router;
