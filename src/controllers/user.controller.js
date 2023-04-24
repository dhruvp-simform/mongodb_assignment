const { Router } = require('express');
const UserService = require('../services/user.service');

const router = Router();

router.get('/profile', async function (req, res) {
    return UserService.getProfile(req, res);
});

module.exports = router;