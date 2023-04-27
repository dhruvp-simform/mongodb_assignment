const { Schema, model } = require('mongoose');
const { v4: uuid } = require('uuid');
const Comment = require('../models/Comment.model');

const postSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid()
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: 'text'
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

postSchema.pre('remove', async function (next) {
    await Comment.deleteMany({ post: this._id });
    next();
});

const Post = model('Post', postSchema);

module.exports = Post;