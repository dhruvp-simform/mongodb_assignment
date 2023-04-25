const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./env');

async function hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);

    return password;
}

async function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

function generateJWTToken(payload) {
    return jwt.sign({ id: payload }, JWT_SECRET);
}

function validateJWTToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    hashPassword,
    verifyPassword,
    generateJWTToken,
    validateJWTToken
};