const joi = require('joi');

const reqParams = joi.string().trim().min(1).required();
const nonemptyObject = joi.object().empty().not();

module.exports = {
    reqParams,
    nonemptyObject
};