const { Router } = require('express');
const CommentService = require('../services/comment.service');

const router = Router();

router.get('/all', async function (req, res, next) {
    try {
        return CommentService.getComments(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.post('/create', async function (req, res, next) {
    try {
        return CommentService.createComment(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.get('/get/:id', async function (req, res, next) {
    try {
        return CommentService.getComment(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.put('/update/:id', async function (req, res, next) {
    try {
        return CommentService.updateComment(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

router.delete('/delete/:id', async function (req, res, next) {
    try {
        return CommentService.deleteComment(req, res);
    } catch (err) {
        if (!err instanceof CustomError) err = new CustomError();
        next(err);
    }
});

module.exports = router;