const { Posts, Users, Likes } = require('../models');
const authMiddleware = require('../middlewares/middleware');
const express = require('express');
const router = express.Router();

router.put('/posts/:postId/like', authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user.dataValues;
    const { postId } = req.params;
    const likes = await Likes.findOne({ where: { userId } });
    const UserId = await Users.findOne({ where: { userId } });

    if (likes && UserId) {
      await Likes.destroy({ where: { userId } });
      return res
        .status(200)
        .json({ message: '게시글의 좋아요를 취소하였습니다.' });
    }

    await Likes.create({ UserId: userId, PostId: postId, like: 0 });
    return res
      .status(200)
      .json({ message: '게시글의 좋아요를 등록하였습니다.' });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMassage: '게시글 좋아요에 실패하였습니다' });
  }
});

router.delete('/b', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user.dataValues;
  await Likes.destroy({ where: { userId } });
  res.json({ message: '삭제' });
});

router.get('/a', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user.dataValues;
  const like = await Likes.findOne({ where: { userId } });
  console.log(like.dataValues);
  res.json({ message: '' });
});

module.exports = router;
