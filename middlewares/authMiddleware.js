const jwt = require('jsonwebtoken');

// 📌 Middleware to Verify JWT Token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Extract token from "Bearer <token>"
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token', error });
    }
};

module.exports = authMiddleware;
