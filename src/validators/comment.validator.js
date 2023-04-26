const Joi = require('joi');
const { CustomError, ERRORS } = require('../utils/customError');

const createCommentBody = Joi.object({
    message: Joi
        .string()
        .trim()
        .min(1)
        .required(),
    postId: Joi
        .string()
        .trim()
        .min(1)
        .required()
}).error(err => { throw new CustomError(ERRORS.CERR_46); });

const updateCommentBody = Joi.object({
    message: Joi
        .string()
        .trim()
        .min(1)
        .required(),
    postId: Joi
        .string()
        .trim()
        .min(1)
        .required()
}).min(2)
    .required()
    .error(err => { throw new CustomError(ERRORS.CERR_46); });

module.exports = {
    createCommentBody,
    updateCommentBody
};