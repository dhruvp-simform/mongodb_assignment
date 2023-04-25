const { Router } = require('express');
const UserService = require('../services/user.service');
const { CustomError } = require('../utils/customError');

const router = Router();

router.get('/profile', async function (req, res, next) {
    try {
        return UserService.getProfile(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.delete('/closeaccount', async function (req, res, next) {
    try {
        return UserService.closeAccount(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

module.exports = router;