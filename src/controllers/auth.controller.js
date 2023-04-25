const { Router } = require('express');
const AuthGuard = require('../guards/auth.guard');
const AuthService = require('../services/auth.service');
const { CustomError } = require('../utils/customError');

const router = Router();

router.post('/signup', async function (req, res, next) {
    try {
        return AuthService.signup(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.post('/signin', async function (req, res, next) {
    try {
        return AuthService.signin(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.post('/signout', AuthGuard, async function (req, res, next) {
    try {
        return AuthService.signout(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

module.exports = router;