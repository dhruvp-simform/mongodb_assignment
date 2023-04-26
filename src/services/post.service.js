const Post = require("../models/Post.model");
const { CustomError } = require('../utils/customError');
const { createpostBody, updatepostBody } = require('../validators/post.validator');
const { reqParams } = require('../validators/app.validator');

async function getPosts(req, res) {
    const posts = await Post.find({});

    return res.send({
        message: 'Success',
        data: posts
    });
}

async function createPost(req, res) {
    try {
        createpostBody.validate(req.body);
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
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        throw err;
    }
}

async function getPost(req, res) {
    try {
        reqParams.validate(req.params);

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
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        throw err;
    }
}

async function updatePost(req, res) {
    try {
        reqParams.validate(req.params);
        const { id } = req.params;

        updatepostBody.validate(req.body);

        const post = await Post.findOneAndUpdate({
            _id: id,
            author: req.user._id
        }, {
            $set: req.body
        });

        return res.send({
            message: 'Success',
            data: post
        });
    } catch (err) {
        if (!(err instanceof CustomError)) err = new CustomError();
        throw err;
    }
}

async function deletePost(req, res) {
    try {
        reqParams.validate(req.params);
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
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        throw err;
    }
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
}

