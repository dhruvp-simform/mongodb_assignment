const Joi = require('joi');
const { CustomError, ERRORS } = require('../utils/customError');

const signupBody = Joi.object({
    username: Joi.string().trim().min(1).required(),
    password: Joi.string().trim().min(8).required(),
    email: Joi.string().email().required()
}).error(err => { throw new CustomError(ERRORS.CERR_46); });

const signinBody = Joi.object({
    identifier: Joi.string().trim().min(1).required(),
    password: Joi.string().trim().min(8).required()
}).error(err => { throw new CustomError(ERRORS.CERR_46); });

module.exports = {
    signupBody,
    signinBody
};