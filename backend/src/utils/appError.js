class AppError extends Error {
    constructor(message, statusCode) {
        super(message);           // sets the message property
        this.statusCode = statusCode; // used by global error handler
    }
}

module.exports = AppError;