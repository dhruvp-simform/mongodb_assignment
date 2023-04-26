const { Router } = require('express');
const { CustomError } = require('../utils/customError');
const CommentService = require('../services/comment.service');

const router = Router();

router.get('/all', async function (req, res, next) {
    try {
        await CommentService.getComments(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.post('/create', async function (req, res, next) {
    try {
        console.log(req.body);
        await CommentService.createComment(req, res);
    } catch (err) {
        console.log(err);
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.get('/get/:id', async function (req, res, next) {
    try {
        await CommentService.getComment(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.put('/update/:id', async function (req, res, next) {
    try {
        await CommentService.updateComment(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.delete('/delete/:id', async function (req, res, next) {
    try {
        await CommentService.deleteComment(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

module.exports = router;