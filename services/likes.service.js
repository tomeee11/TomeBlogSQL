const LikeRepository = require('../repositories/likes.repository');

class LikeService {
  likeRepository = new LikeRepository();

  Like = async (userId, postId) => {
    const post = await this.likeRepository.findPost(postId);
    const like = await this.likeRepository.findLike(userId, postId);

    if (!post) throw new Error('게시글이 존재하지 않습니다.');
    if (like === null) {
      await this.likeRepository.createLike(userId, postId);
      return '좋아요를 생성하였습니다.';
    } else {
      await this.likeRepository.destroyLike(userId, postId);
      return '좋아요를 취소하였습니다.';
    }
  };

  findPost = async () => {
    const posts = await this.likeRepository.findAllPost({});
    const likes = await this.likeRepository.findAllLike({});
    const likeCnt = likes.length;
    return posts.map(a => {
      return {
        postId: a.postId,
        userId: a.UserId,
        nickname: a.User.nickname,
        title: a.title,
        content: a.content,
        like: likeCnt,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });
  };
}

module.exports = LikeService;
