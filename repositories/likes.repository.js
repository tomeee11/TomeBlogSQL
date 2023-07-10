const { Op } = require('sequelize');
const { Posts, Users, Likes } = require('../models');

class LikeRepository {
  findPost = async postId => {
    const post = await Posts.findByPk(postId);
    return post;
  };
  findAllPost = async () => {
    const posts = await Posts.findAll({
      include: { model: Users },
    });
    return posts;
  };

  findLike = async (userId, postId) => {
    const like = await Likes.findOne({
      where: {
        [Op.and]: [{ postId }, { userId }],
      },
    });
    return like;
  };

  findAllLike = async () => {
    const like = await Likes.findAll({});
    return like;
  };
  createLike = async (userId, postId) => {
    const like = await Likes.create({ UserId: userId, PostId: postId });
    return like;
  };
  destroyLike = async (userId, postId) => {
    const like = await Likes.destroy({
      where: {
        [Op.and]: [{ userId }, { postId }],
      },
    });
    return like;
  };
}

module.exports = LikeRepository;
