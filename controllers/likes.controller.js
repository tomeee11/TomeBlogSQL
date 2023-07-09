const LikeService = require('../services/likes.service');

class LikeController {
  likeService = new LikeService();

  Likes = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    try {
      const like = await this.likeService.Like(userId, postId);
      res.json({ message: like });
    } catch (e) {
      console.log(e);
      res.json({ e: e.message });
    }
  };

  findPost = async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
      const findPost = await this.likeService.findPost();
      res.status(200).json({ data: findPost });
    } catch (e) {
      res.status(400).json({ e: e.message });
    }
  };
}

module.exports = LikeController;
