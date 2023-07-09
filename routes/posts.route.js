const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/middleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getOnePosts);
router.post('/', authMiddleware, postsController.createPost);
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.destroyPost);

module.exports = router;
