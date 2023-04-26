const { Schema, model } = require('mongoose');
const { v4: uuid } = require('uuid');

const commentSchema = new Schema({
    _id: {
        type: String,
        default: () => uuid()
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String
    },
    post: {
        type: String
    }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;