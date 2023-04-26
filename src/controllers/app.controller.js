const { Router } = require('express');
const AuthController = require('./auth.controller');
const UserController = require('./user.controller');
const PostController = require('./post.controller');
const CommentController = require('./comment.controller');
const AuthGuard = require('../guards/auth.guard');

const router = Router();

router.use('/auth', AuthController);
router.use('/user', AuthGuard, UserController);
router.use('/post', AuthGuard, PostController);
router.use('/comment', AuthGuard, CommentController);

module.exports = router;