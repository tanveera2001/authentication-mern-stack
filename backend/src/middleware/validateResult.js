
const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error("Validation failed");
        err.statusCode = 422;
        err.errors = errors.array().map(error => ({ field: error.param, message: error.msg }));
        return next(err); // passes to global error handler
    }

    next(); // continue if validation passes
};

module.exports = validateResult;
