const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model');
const { ERRORS, CustomError } = require('../utils/customError');
const { reqParams } = require('../validators/app.validator');
const { nonemptyObject } = require('../validators/app.validator');
const { createCommentBody, updateCommentBody } = require('../validators/comment.validator');

async function getComments(req, res) {
    const comments = await Comment.find({});
    return res.send({
        message: 'Success',
        data: comments
    });
}

async function createComment(req, res) {
    let { error } = createCommentBody.validate(req.body);
    if (error) throw new CustomError(ERRORS.CERR_46);

    ({ error } = nonemptyObject.validate(req.body));
    if (error) throw new CustomError(ERRORS.CERR_46);

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
}

async function getComment(req, res) {
    let { error } = reqParams.validate(req.params);
    if (error) throw new CustomError(ERRORS.CERR_47);
    const { id } = req.params;

    const comment = await Comment.findOne({
        _id: id,
        author: req.user._id
    });

    return res.send({
        message: 'Success',
        data: comment
    });
}

async function updateComment(req, res) {
    let { error } = reqParams.validate(req.params);
    if (error) throw new CustomError(ERRORS.CERR_47);
    const { id } = req.params;

    ({ error } = updateCommentBody.validate(req.body));
    if (error) throw new CustomError(ERRORS.CERR_46);
    ({ error } = nonemptyObject.validate(req.body));
    if (error) throw new CustomError(ERRORS.CERR_46);

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
}

async function deleteComment(req, res) {
    let { error } = reqParams.validate(req.params);
    if (error) throw new CustomError(ERRORS.CERR_47);

    const { id } = req.params;

    await Comment.deleteOne({
        _id: id,
        author: req.user._id
    });

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