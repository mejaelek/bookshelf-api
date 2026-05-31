const express = require('express');
const router = express.Router();
const passport = require('passport');
const protect = require('../middleware/protect');
const { getProfile, logout } = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: GitHub OAuth login, logout and profile
 */

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Initiate GitHub OAuth login
 *     tags: [Authentication]
 *     description: >
 *       Redirects the user to GitHub for authentication.
 *       After successful login, GitHub redirects back to /auth/github/callback.
 *       Open this URL directly in your browser — it cannot be tested in Swagger UI.
 *     responses:
 *       302:
 *         description: Redirect to GitHub OAuth
 */
router.get(
    '/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Authentication]
 *     description: >
 *       GitHub redirects to this URL after authentication.
 *       On success, a session cookie is set and the user profile is returned.
 *     responses:
 *       200:
 *         description: Login successful — session cookie set
 *       401:
 *         description: Authentication failed
 */
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                username: req.user.username,
                displayName: req.user.displayName,
                email: req.user.email,
                avatarUrl: req.user.avatarUrl,
            },
        });
    }
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     description: Returns the profile of the currently logged-in user. Requires an active session.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 user:
 *                   type: object
 *                   properties:
 *                     username: { type: string, example: "mejaelek" }
 *                     displayName: { type: string, example: "Godfrey" }
 *                     email: { type: string, example: "godfrey@example.com" }
 *       401:
 *         description: Not authenticated
 */
router.get('/profile', protect, getProfile);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log out current user
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Logout error
 */
router.get('/logout', protect, logout);

/**
 * @swagger
 * /auth/failure:
 *   get:
 *     summary: Authentication failure
 *     tags: [Authentication]
 *     responses:
 *       401:
 *         description: Authentication failed
 */
router.get('/failure', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'GitHub authentication failed — please try again',
        loginUrl: '/auth/github',
    });
});

module.exports = router;
