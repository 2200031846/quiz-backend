// 📌 Success Response
exports.successResponse = (res, message, data = {}) => {
    res.status(200).json({
        success: true,
        message,
        data
    });
};

// 📌 Created Response (201)
exports.createdResponse = (res, message, data = {}) => {
    res.status(201).json({
        success: true,
        message,
        data
    });
};

// 📌 Error Response
exports.errorResponse = (res, message, error = null, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message,
        error: error ? error.toString() : null
    });
};

// 📌 Validation Error Response (400)
exports.validationErrorResponse = (res, message, errors = []) => {
    res.status(400).json({
        success: false,
        message,
        errors
    });
};

// 📌 Unauthorized Response (401)
exports.unauthorizedResponse = (res, message = "Unauthorized access") => {
    res.status(401).json({
        success: false,
        message
    });
};

// 📌 Forbidden Response (403)
exports.forbiddenResponse = (res, message = "Access forbidden") => {
    res.status(403).json({
        success: false,
        message
    });
};

// 📌 Not Found Response (404)
exports.notFoundResponse = (res, message = "Resource not found") => {
    res.status(404).json({
        success: false,
        message
    });
};
