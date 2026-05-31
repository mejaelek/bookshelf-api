// @desc    Get current logged-in user profile
// @route   GET /auth/profile
// @access  Protected
const getProfile = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'You are logged in',
        user: {
            id: req.user._id,
            username: req.user.username,
            displayName: req.user.displayName,
            email: req.user.email,
            avatarUrl: req.user.avatarUrl,
            profileUrl: req.user.profileUrl,
        },
    });
};

// @desc    Logout current user
// @route   GET /auth/logout
// @access  Protected
const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.status(200).json({
                success: true,
                message: 'Logged out successfully',
            });
        });
    });
};

module.exports = { getProfile, logout };
