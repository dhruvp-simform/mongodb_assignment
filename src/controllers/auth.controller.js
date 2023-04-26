const { Router } = require('express');
const AuthGuard = require('../guards/auth.guard');
const AuthService = require('../services/auth.service');
const { CustomError, ERRORS } = require('../utils/customError');

const router = Router();

router.post('/signup', async function (req, res, next) {
    try {
        await AuthService.signup(req, res);
    } catch (err) {
        if (!(err instanceof CustomError)) {
            if (err['code'] === 11000) {
                const keyword = Object.keys(err.keyValue)[0];
                const value = Object.values(err.keyValue)[0];
                err = new CustomError(ERRORS.CERR_44(keyword, value));
            }
            else err = new CustomError();
        }
        next(err);
    }
});

router.post('/signin', async function (req, res, next) {
    try {
        await AuthService.signin(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.post('/signout', AuthGuard, async function (req, res, next) {
    try {
        await AuthService.signout(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

module.exports = router;