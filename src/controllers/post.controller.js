const { Router } = require('express');
const PostService = require('../services/post.service');
const { CustomError } = require('../utils/customError');

const router = Router();

router.get('/posts', async function (req, res, next) {
    try {
        return PostService.getPosts(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.post('/post', async function (req, res, next) {
    try {
        return PostService.createPost(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.get('/post/:id', async function (req, res, next) {
    try {
        return PostService.getPost(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.put('/post/:id', async function (req, res, next) {
    try {
        return PostService.updatePost(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.delete('/post/:id', async function (req, res, next) {
    try {
        return PostService.deletePost(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

module.exports = router;