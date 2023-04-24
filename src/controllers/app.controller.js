const { Router } = require('express');
const AuthController = require('./auth.controller');
const UserController = require('./user.controller');
const PostController = require('./post.controller');
const CommentController = require('./comment.controller');

const router = Router();

router.use('/auth', AuthController);
router.use('/user', UserController);
router.use('/post', PostController);
router.use('/comment', CommentController);

module.exports = router;