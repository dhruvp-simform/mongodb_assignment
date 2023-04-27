const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model');
const { CustomError, ERRORS } = require('../utils/customError');
const { reqParams } = require('../validators/app.validator');
const { createCommentBody, updateCommentBody, commentQueryParams } = require('../validators/comment.validator');

async function getComments(req, res) {
    commentQueryParams.validate(req.query);

    const comments = await Comment.find({ post: req.query.post });
    return res.send({
        message: 'Success',
        data: comments
    });
}

async function createComment(req, res) {
    createCommentBody.validate(req.body);

    const { message, postId } = req.body;

    const post = await Post.findOne({ _id: postId });
    if (!post) throw new CustomError(ERRORS.CERR_45('Post'));

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
}

async function getComment(req, res) {
    reqParams.validate(req.params);

    const { id } = req.params;

    const comment = await Comment.findOne({
        _id: id,
        author: req.user._id
    });

    if (!comment) throw new CustomError(ERRORS.CERR_45('Comment'));

    return res.send({
        message: 'Success',
        data: comment
    });
}

async function updateComment(req, res) {
    reqParams.validate(req.params);
    const { id } = req.params;

    updateCommentBody.validate(req.body);

    const { message, postId } = req.body;

    const comment = await Comment.findOneAndUpdate(
        {
            _id: id,
            author: req.user._id,
            post: postId
        },
        { message },
        { new: true }
    );

    if (!comment) throw new CustomError(ERRORS.CERR_45('Comment'));

    return res.send({
        message: 'Success',
        data: comment
    });
}

async function deleteComment(req, res) {
    reqParams.validate(req.params);

    const { id } = req.params;

    const result = await Comment.deleteOne({
        _id: id,
        author: req.user._id
    });

    if (!result.deletedCount) throw new CustomError(ERRORS.CERR_45('Comment'));

    return res.send({
        message: 'Success'
    });
}

module.exports = {
    getComments,
    createComment,
    getComment,
    updateComment,
    deleteComment
};