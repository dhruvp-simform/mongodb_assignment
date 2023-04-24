const { Router } = require('express');
const PostService = require('../services/post.service');

const router = Router();

router.get('/posts', async function (req, res) {
    return PostService.getPosts(req, res);
});

router.post('/post', async function (req, res) {
    return PostService.createPost(req, res);
});

router.get('/post/:id', async function (req, res) {
    return PostService.getPost(req, res);
});

router.put('/post/:id', async function (req, res) {
    return PostService.updatePost(req, res);
});

router.delete('/post/:id', async function (req, res) {
    return PostService.deletePost(req, res);
});

module.exports = router;