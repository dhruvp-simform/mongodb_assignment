const User = require('../models/User.model');
const { CustomError, ERRORS } = require('../utils/customError');

async function getProfile(req, res) {
    return res.send({
        message: 'Success',
        data: req.user
    });
}

async function closeAccount(req, res) {
    const result = await User.deleteOne({
        _id: req.user._id
    });

    if (!result.deletedCount) throw new CustomError(ERRORS.CERR_45('User'));

    return res.send({
        message: 'Success'
    });
}

module.exports = {
    getProfile,
    closeAccount
};