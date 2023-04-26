const joi = require('joi');
const User = require('../models/User.model');
const { ERRORS, CustomError } = require('../utils/customError');
const { verifyPassword } = require('../utils/utillities');
const { signupBody, signinBody } = require('../validators/auth.validator');

async function signup(req, res) {
    signupBody.validate(req.body);

    const { username, password, email } = req.body;

    const user = new User({ username, password, email });
    const token = await user.generateAuthToken();

    return res.send({
        message: 'Success',
        token
    });
}

async function signin(req, res) {
    signinBody.validate(req.body);

    const { identifier, password } = req.body;
    let { error } = joi.string().email().validate(identifier);

    let identifierKeyword = 'email';
    if (error) identifierKeyword = 'username';

    const user = await User.findOne({
        $or: [
            { username: identifier.toLowerCase() },
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