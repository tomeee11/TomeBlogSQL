// services/posts.service.js

const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost({});

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost.map(post => {
      return {
        postId: post.postId,
        userId: post.UserId,
        nickname: post.User.nickname,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findPostById = async postId => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error('게시글이 존재하지 않습니다.');

    return {
      postId: findPost.postId,
      userId: findPost.UserId,
      nickname: findPost.User.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
  };

  createPost = async (userId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    await this.postRepository.createPost(userId, title, content);
  };

  updatePost = async (userId, postId, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error('게시물이 존재하지 않습니다.');
    await this.postRepository.updatePost(userId, postId, title, content);
  };

  destroyPost = async (userId, postId) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error('게시물이 존재하지 않습니다.');
    await this.postRepository.destroyPost(userId, postId);
  };
}

module.exports = PostService;
