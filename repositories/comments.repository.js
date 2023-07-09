const { Op } = require('sequelize');
const { Posts, Users, Comments } = require('../models');

class CommentRepository {
  findOneComment = async commentId => {
    const comment = await Comments.findOne({ where: { commentId } });
    return comment;
  };
  findComment = async (userId, postId, commentId) => {
    const comment = await Comments.findAll({
      where: { PostId: postId },
      include: [{ model: Users }, { model: Posts }],
    });
    return comment;
  };

  createComment = async (userId, postId, comment) => {
    const createCommentData = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });
    return createCommentData;
  };

  updateComment = async (userId, comment, postId, commentId) => {
    const updateCommentData = await Comments.update(
      { comment },
      { where: { [Op.and]: [{ postId }, { commentId }] } }
    );
    return updateCommentData;
  };

  deleteComment = async (userId, postId, commentId) => {
    const deleteCommentData = await Comments.destroy({
      where: { [Op.and]: [{ postId }, { commentId }] },
    });

    return deleteCommentData;
  };
}
module.exports = CommentRepository;
