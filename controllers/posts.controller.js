const { json } = require('sequelize');
const PostService = require('../services/posts.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
      const posts = await this.postService.findAllPost();
      res.status(200).json({ data: posts });
    } catch (e) {
      res.status(412).json({ errorMessage: '게시물 조회에 실패하였습니다.' });
    }
  };

  getOnePosts = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const post = await this.postService
        .findPostById(postId)
        .catch(e => res.status(412).json({ errorMessage: e.message }));
      res.status(200).json({ data: post });
    } catch (e) {
      res
        .status(412)
        .json({ errorMessage: '게시글 상세조회에 실패하였습니다.' });
    }
  };

  createPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    if (!(title && content)) {
      res.status(412).json({ errorMessage: 'title과 content를 입력해주세요.' });
    }
    try {
      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createPostData = await this.postService.createPost(
        userId,
        title,
        content
      );
      res.status(201).json({ data: createPostData });
    } catch (e) {
      res.status(412).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
  };
  updatePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    if (!(title || content)) {
      res.status(412).json({
        errorMessage: '수정하실 게시글의 title, conetent를 입력해주세요..',
      });
    }
    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    try {
      await this.postService
        .updatePost(userId, postId, title, content)
        .catch(e => res.status(412).json({ errorMessage: e.message }));

      res.status(201).json({ message: '게시글이 수정되었습니다.' });
    } catch (e) {
      res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
  };
  destroyPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    try {
      await this.postService
        .destroyPost(userId, postId)
        .catch(e => res.status(412).json({ errorMessage: e.message }));
      res.status(201).json({ message: '게시글이 삭제되었습니다.' });
    } catch (e) {
      res.json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
    }
  };
}

module.exports = PostsController;
