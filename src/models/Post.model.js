const { Schema, model } = require('mongoose');
const { v4: uuid } = require('uuid');

const postSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid(),
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String
    }
});

const Post = model('Post', postSchema);

module.exports = Post; 