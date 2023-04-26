const Joi = require('joi');
const { CustomError, ERRORS } = require('../utils/customError');

const reqParams = Joi.object({
    id: Joi
        .string()
        .trim()
        .min(1)
        .required()
}).error(err => { throw new CustomError(ERRORS.CERR_47); });

module.exports = {
    reqParams
};