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

const postQueryBody = Joi.object({
    search: Joi
        .string()
        .trim()
        .min(1)
        .optional(),
    page: Joi
        .number()
        .min(0)
        .optional(),
    sort: Joi
        .string()
        .valid('asc', 'desc')
        .optional()
}).error(err => { throw new CustomError(ERRORS.CERR_48); });

module.exports = {
    createpostBody,
    updatepostBody,
    postQueryBody
};