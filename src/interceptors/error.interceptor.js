const { CustomError } = require('../utils/customError');

module.exports = function (err, req, res, next) {
    if (!(err instanceof CustomError)) err = new CustomError();

    res.status(err.code).send({
        message: err.message,
        description: err.description
    });
};