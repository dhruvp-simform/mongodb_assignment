const User = require('../models/User.model');

async function getProfile(req, res) {
    return res.send({
        message: 'Success',
        data: req.user
    });
}

async function closeAccount(req, res) {
    await User.deleteOne({
        _id: req.user._id
    });

    return res.send({
        message: 'Success'
    });
}

module.exports = {
    getProfile,
    closeAccount
};