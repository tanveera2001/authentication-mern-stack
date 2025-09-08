
const successResponse = (res, { statusCode = 200, message = "Request processed successfully", user = null }) => {
    return res.status(statusCode).json({
        success: true, 
        message: message, 
        ...(user && { user }),
    });
};

const errorResponse = (res, { statusCode = 500, message = "An unexpected error occurred on the server.", errors = [] }) => {
    const response = {success: false, message: message};
    
    if(errors.length > 0) response.errors = errors;

    return res.status(statusCode).json(response);
};

module.exports = {successResponse, errorResponse};