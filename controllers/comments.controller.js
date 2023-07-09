const CommentService = require('../services/comments.service');

class CommentController {
  commentService = new CommentService();

  getComments = async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { userId } = res.locals.user;
    try {
      const comments = await this.commentService
        .findComment(userId, postId, commentId)
        .catch(e => res.status(412).json({ errorMessage: e.message }));
      res.status(200).json({ data: comments });
    } catch (e) {
      res.status(400).json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }
  };

  createComments = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;
    if (!comment) {
      res.status(412).json({ errorMessage: '댓글을 입력해주세요.' });
    }
    try {
      await this.commentService
        .createComment(userId, postId, comment)
        .catch(e => res.json({ errorMessage: e.message }));

      res.status(201).json({ massage: '댓글을 생성하였습니다.' });
    } catch (e) {
      res.status(400).json({ errorMessage: '댓글 생성에 실패하였습니다.' });
    }
  };

  updateComments = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { comment } = req.body;
    const { postId, commentId } = req.params;
    if (!comment) {
      res.status(412).json({ errorMessage: '변경할 댓글을 입력해주세요.' });
    }
    await this.commentService
      .updateComment(userId, comment, postId, commentId)
      .catch(e => res.status(412).json({ errorMessage: e.message }));
    res.status(201).json({ message: '댓글 수정에 성공하였습니다.' });
  };

  deleteComments = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    try {
      await this.commentService
        .deleteComment(userId, postId, commentId)
        .catch(e => res.status(412).json({ errorMessage: e.message }));
      res.status(201).json({ message: '댓글을 삭제하였습니다.' });
    } catch (e) {
      res.status(400).json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
    }
  };
}
module.exports = CommentController;
