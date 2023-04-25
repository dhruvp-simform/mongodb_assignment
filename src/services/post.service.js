const Post = require("../models/Post.model");
const { CustomError, ERRORS } = require('../utils/customError');
const { createpostBody, updatepostBody } = require('../validators/post.validator');
const { requestParams, nonemptyObject } = require('../validators/app.validator');

async function getPosts(req, res) {
    const posts = await Post.find({});

    return res.send({
        message: 'Success',
        data: posts
    });
}

async function createPost(req, res) {
    let { error } = createpostBody.validate(req.body);
    if (error) throw new CustomError(ERRORS.CERR_46);

    const { title, description } = req.body;

    const post = new Post({
        title,
        description,
        author: req.user._id
    });

    await post.save();

    return res.send({
        message: 'Success',
        data: post
    });
}

async function getPost(req, res) {
    let { error } = requestParams.validate(req.params);
    if (error) throw new CustomError(ERRORS.CERR_47);

    const { id } = req.params;

    const post = await Post.findOne({
        $and: [
            { _id: id },
            { author: req.user._id }
        ]
    });

    return res.send({
        message: 'Success',
        data: post
    });
}

async function updatePost(req, res) {
    let { error } = requestParams.validate(req.params);
    if (error) throw new CustomError(ERRORS.CERR_47);

    const { id } = req.params;

    ({ error } = updatepostBody.validate(req.body));
    if (error) throw new CustomError(ERRORS.CERR_46);

    ({ error } = nonemptyObject.validate(req.body));
    if (error) throw new CustomError(ERRORS.CERR_46);

    const post = await Post.findOneAndUpdate({
        _id: id,
        author: req.user._id
    }, {
        $set: req.body
    });

    return {
        message: 'Success',
        data: post
    };
}

async function deletePost(req, res) {
    let { error } = requestParams.validate(req.params);
    if (error) throw new CustomError(ERRORS.CERR_47);

    const { id } = req.params;

    await Post.deleteOne({
        $and: [
            { _id: id },
            { author: req.user._id }
        ]
    });

    return res.send({
        message: 'Success'
    });
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
}

