const User = require('../models/User.model');
const { validateJWTToken } = require('../utils/utillities');
const { CustomError, ERRORS } = require('../utils/customError');

module.exports = async function (req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) throw new CustomError(ERRORS.CERR_41);

        const { id } = validateJWTToken(token);

        const user = await User.findOne({ _id: id });
        if (!user) throw new CustomError(ERRORS.CERR_41);

        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
};