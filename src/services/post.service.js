const Post = require("../models/Post.model");
const { createpostBody, updatepostBody, postQueryBody } = require('../validators/post.validator');
const { reqParams } = require('../validators/app.validator');
const { CustomError, ERRORS } = require("../utils/customError");
const { PAGESIZE } = require('../utils/env');

async function getPosts(req, res) {
    const { value } = postQueryBody.validate(req.query);
    req.query = value;

    const aggregationPipeline = [];
    if (req.query.search) aggregationPipeline.push({
        $match: {
            $text: { $search: req.query.search }
        }
    });

    if (req.query.sort) aggregationPipeline.push({ $sort: { title: req.query.sort === 'asc' ? 1 : -1 } });

    if (req.query.page) aggregationPipeline.push(
        { $skip: PAGESIZE * (req.query.page - 1) },
        { $limit: PAGESIZE }
    );

    const posts = await Post.aggregate(aggregationPipeline);

    return res.send({
        message: 'Success',
        data: posts
    });
}

async function createPost(req, res) {
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
}

async function getPost(req, res) {
    reqParams.validate(req.params);

    const { id } = req.params;

    const post = await Post.findOne({
        _id: id,
        author: req.user._id
    });

    if (!post) throw new CustomError(ERRORS.CERR_45('Post'));

    return res.send({
        message: 'Success',
        data: post
    });
}

async function updatePost(req, res) {
    reqParams.validate(req.params);
    const { id } = req.params;

    updatepostBody.validate(req.body);

    const post = await Post.findOneAndUpdate(
        {
            _id: id,
            author: req.user._id
        },
        { ...req.body },
        { new: true }
    );

    if (!post) throw new CustomError(ERRORS.CERR_45('Post'));

    return res.send({
        message: 'Success',
        data: post
    });
}

async function deletePost(req, res) {
    reqParams.validate(req.params);
    const { id } = req.params;

    const result = await Post.deleteOne({
        _id: id,
        author: req.user._id
    });

    if (!result.deletedCount) throw new CustomError(ERRORS.CERR_45('Post'));

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

