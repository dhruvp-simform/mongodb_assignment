const { Router } = require('express');
const PostService = require('../services/post.service');
const { CustomError } = require('../utils/customError');

const router = Router();

router.get('/all', async function (req, res, next) {
    try {
        await PostService.getPosts(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.post('/create', async function (req, res, next) {
    try {
        await PostService.createPost(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.get('/get/:id', async function (req, res, next) {
    try {
        await PostService.getPost(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.put('/update/:id', async function (req, res, next) {
    try {
        await PostService.updatePost(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.delete('/delete/:id', async function (req, res, next) {
    try {
        await PostService.deletePost(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

module.exports = router;