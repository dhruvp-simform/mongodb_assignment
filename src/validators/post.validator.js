const Joi = require('joi');
const { CustomError, ERRORS } = require('../utils/customError');

const createpostBody = Joi.object({
    title: Joi
        .string()
        .trim()
        .min(1)
        .required(),
    description: Joi
        .string()
        .trim()
        .min(1)
        .required()
}).error(err => { throw new CustomError(ERRORS.CERR_46); });

const updatepostBody = Joi.object({
    title: Joi
        .string()
        .trim()
        .min(1)
        .optional(),
    description: Joi
        .string()
        .min(1)
        .trim()
        .optional(),
}).min(1)
    .required()
    .error(err => { throw new CustomError(ERRORS.CERR_46); });

module.exports = {
    createpostBody,
    updatepostBody
};