const { errorResponse } = require("../controllers/responseController");

const globalErrorHandler = (err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status || 500, 
        message: err.message || "An unexpected error occurred on the server.", 
        errors: err.errors || [],
    });
};

module.exports = globalErrorHandler;