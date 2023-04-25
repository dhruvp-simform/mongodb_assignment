const joi = require('joi');
const User = require('../models/User.model');
const { ERRORS, CustomError } = require('../utils/customError');
const { verifyPassword } = require('../utils/utillities');
const { signupBody, signinBody } = require('../validators/auth.validator');

async function signup(req, res) {
    const { error } = signupBody.validate(req.body);
    if (error) throw new CustomError(ERRORS.CERR_46);

    const { username, password, email } = req.body;

    const user = new User({ username, password, email });
    const token = await user.generateAuthToken();

    return res.send({
        message: 'Success',
        token
    });
}

async function signin(req, res) {
    let { error } = signinBody.validate(req.body);
    if (error) throw new CustomError(ERRORS.CERR_46);

    const { identifier, password } = req.body;
    ({ error } = joi.string().email().validate(identifier));

    let identifierKeyword = 'email';
    if (error) identifierKeyword = 'username';

    const user = await User.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    });

    if (!user) throw new CustomError(ERRORS.CERR_43(identifierKeyword, identifier));

    if (!(await verifyPassword(password, user.password)))
        throw new CustomError(ERRORS.CERR_42);

    const token = await user.generateAuthToken();

    return res.send({
        message: 'Success',
        token
    });
}

async function signout(req, res) {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token);

    await req.user.save();
    return res.send({
        message: 'Success'
    });
}

module.exports = { signin, signup, signout };