const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model');
const { CustomError } = require('../utils/customError');
const { reqParams } = require('../validators/app.validator');
const { createCommentBody, updateCommentBody } = require('../validators/comment.validator');

async function getComments(req, res) {
    const comments = await Comment.find({});
    return res.send({
        message: 'Success',
        data: comments
    });
}

async function createComment(req, res) {
    try {
        createCommentBody.validate(req.body);

        const { message, postId } = req.body;

        const comment = new Comment({
            message,
            author: req.user._id,
            post: postId
        });

        await comment.save();

        return res.send({
            message: 'Success',
            data: comment
        });
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        throw err;
    }
}

async function getComment(req, res) {
    try {
        reqParams.validate(req.params);

        const { id } = req.params;

        const comment = await Comment.findOne({
            _id: id,
            author: req.user._id
        });

        return res.send({
            message: 'Success',
            data: comment
        });
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        throw err;
    }
}

async function updateComment(req, res) {
    try {
        reqParams.validate(req.params);
        const { id } = req.params;

        updateCommentBody.validate(req.body);

        const { message, postId } = req.body;

        const comment = await Post.findOneAndUpdate({
            _id: id,
            author: req.user._id,
            post: postId
        }, {
            $set: { message }
        });

        return res.send({
            message: 'Success',
            data: comment
        });

    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        throw err;
    }
}

async function deleteComment(req, res) {

    try {
        reqParams.validate(req.params);

        const { id } = req.params;

        await Comment.deleteOne({
            _id: id,
            author: req.user._id
        });

        return res.send({
            message: 'Success'
        });
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        throw err;
    }
}

module.exports = {
    getComments,
    createComment,
    getComment,
    updateComment,
    deleteComment
};