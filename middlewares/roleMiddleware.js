// 📌 Middleware to Restrict Access Based on Role
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        // Ensure the user is authenticated and has the correct role
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access Forbidden: Admins Only' });
        }
        next(); // Proceed to the next middleware or route handler
    };
};

module.exports = roleMiddleware;
