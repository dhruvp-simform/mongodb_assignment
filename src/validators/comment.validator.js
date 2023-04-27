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
        .uuid()
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
        .uuid()
        .trim()
        .min(1)
        .required()
}).error(err => { throw new CustomError(ERRORS.CERR_46); });

const commentQueryParams = Joi.object({
    post: Joi.string().uuid().min(1).required()
}).error(err => { throw new CustomError(ERRORS.CERR_48); });

module.exports = {
    createCommentBody,
    updateCommentBody,
    commentQueryParams
};