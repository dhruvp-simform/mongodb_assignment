const { Router } = require('express');
const AuthGuard = require('../guards/auth.guard');
const AuthService = require('../services/auth.service');

const router = Router();

router.post('/signup', (req, res) => {
    return AuthService.signup(req, res);
});

router.post('/signin', (req, res) => {
    return AuthService.signin(req, res);
});

router.post('/signout', AuthGuard, (req, res) => {
    return AuthService.signout(req, res);
});

module.exports = router;