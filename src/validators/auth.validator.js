const joi = require('joi');

const signupBody = joi.object({
    username: joi.string().trim().min(1).required(),
    password: joi.string().trim().min(8).required(),
    email: joi.string().email().required()
});

const signinBody = joi.object({
    identifier: joi.string().trim().min(1).required(),
    password: joi.string().trim().min(8).required()
});

module.exports = {
    signupBody,
    signinBody
};