const { Schema, model } = require('mongoose');
const { v4: uuid } = require('uuid');
const { generateJWTToken, hashPassword } = require('../utils/utillities');

const userSchema = Schema({
    _id: {
        type: String,
        default: () => uuid(),
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    tokens: [
        {
            type: String,
            required: true
        }
    ]
});

userSchema.methods.generateAuthToken = async function () {
    const token = generateJWTToken(this._id);

    this.tokens.push(token);
    await this.save();
    return token;
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password'))
        this.password = await hashPassword(this.password);

    next();
});

userSchema.pre('remove', async function (next) {
    // Delete Posts and Comments for the same user
    next();
});

const User = model('User', userSchema);

module.exports = User;