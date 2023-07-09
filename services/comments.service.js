// services/posts.service.js
const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  findComment = async (userId, postId, commentId) => {
    const findcomment = await this.commentRepository.findOneComment(commentId);
    if (!findcomment) throw new Error('댓글이 존재하지 않습니다.');
    const allComment = await this.commentRepository.findComment(
      userId,
      postId,
      commentId
    );

    allComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return allComment.map(comment => {
      return {
        userId: comment.UserId,
        postId: comment.PostId,
        commentId: comment.commentId,
        nickname: comment.User.nickname,
        title: comment.Post.title,
        content: comment.Post.content,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  createComment = async (userId, postId, comment) => {
    await this.commentRepository.createComment(userId, postId, comment);
  };

  updateComment = async (userId, comment, postId, commentId) => {
    const findcomment = await this.commentRepository.findOneComment(commentId);
    if (!findcomment) throw new Error('댓글이 존재하지 않습니다.');
    await this.commentRepository.updateComment(
      userId,
      comment,
      postId,
      commentId
    );
  };

  deleteComment = async (userId, postId, commentId) => {
    const findcomment = await this.commentRepository.findOneComment(commentId);
    if (!findcomment) throw new Error('댓글이 존재하지 않습니다.');

    await this.commentRepository.deleteComment(userId, postId, commentId);
  };
}

module.exports = CommentService;
