const { Router } = require('express');
const CommentService = require('../services/comment.service');

const router = Router();

router.get('/comments', async function (req, res) {
    return CommentService.getComments(req, res);
});

router.post('/comment', async function (req, res) {
    return CommentService.createComment(req, res);
});

router.get('/comment/:id', async function (req, res) {
    return CommentService.getComment(req, res);
});

router.put('/comment/:id', async function (req, res) {
    return CommentService.updateComment(req, res);
});

router.delete('/comment/:id', async function (req, res) {
    return CommentService.deleteComment(req, res);
});

module.exports = router;