const joi = require('joi');

const createpostBody = joi.object({
    title: joi.string().trim().min(1).required(),
    description: joi.string().trim().min(1).required()
});

const updatepostBody = joi.object({
    title: joi.string().trim().min(1).required(),
    description: joi.string().min(1).trim().required(),
});

module.exports = {
    createpostBody,
    updatepostBody
};