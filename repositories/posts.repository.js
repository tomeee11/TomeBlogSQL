// repositories/posts.repository.js
const { Op } = require('sequelize');
const { Posts, Users } = require('../models');

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll({
      include: { model: Users },
    });

    return posts;
  };

  findPostById = async postId => {
    const post = await Posts.findOne({
      where: { postId },
      include: { model: Users },
    });

    return post;
  };

  createPost = async (userId, title, content) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    return createPostData;
  };

  updatePost = async (userId, postId, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      { where: { postId } }
    );
    return updatePostData;
  };

  destroyPost = async (userId, postId) => {
    const destroyPostData = await Posts.destroy({ where: { postId } });

    return destroyPostData;
  };
}

module.exports = PostRepository;
