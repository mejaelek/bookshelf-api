const protect = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        success: false,
        message: 'Unauthorized — please log in via /auth/github to access this route',
        loginUrl: '/auth/github',
    });
};

module.exports = protect;
