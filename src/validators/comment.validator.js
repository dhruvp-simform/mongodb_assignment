const joi = require('joi');

const createCommentBody = joi.object({
    message: joi.string().trim().min(1).required(),
    postId: joi.string().trim().min(1).required()
});

const updateCommentBody = joi.object({
    message: joi.string().trim().min(1).required(),
    postId: joi.string().trim().min(1).required()
});

module.exports = {
    createCommentBody,
    updateCommentBody
};