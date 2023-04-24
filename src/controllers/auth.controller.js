const { Router } = require('express');
const AuthGuard = require('../guards/auth.guard');
const AuthService = require('../services/auth.service');

const router = Router();

router.post('/signup', async function (req, res) {
    return AuthService.signup(req, res);
});

router.post('/signin', async function (req, res) {
    return AuthService.signin(req, res);
});

router.post('/signout', AuthGuard, async function (req, res) {
    return AuthService.signout(req, res);
});

module.exports = router;