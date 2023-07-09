const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/middleware');
const CommentController = require('../controllers/comments.controller');
const commentController = new CommentController();
router.get(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentController.getComments
);
router.post(
  '/:postId/comments',
  authMiddleware,
  commentController.createComments
);

router.put(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentController.updateComments
);

router.delete(
  '/:postId/comments/:commentId',
  authMiddleware,
  commentController.deleteComments
);
module.exports = router;
