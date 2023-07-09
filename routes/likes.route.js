const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/middleware');
const LikeController = require('../controllers/likes.controller');
const likeController = new LikeController();

router.put('/posts/:postId/like', authMiddleware, likeController.Likes);
router.get('/posts/like', authMiddleware, likeController.findPost);
module.exports = router;
// const { Posts, Users, Likes } = require('../models');
// const authMiddleware = require('../middlewares/middleware');
// const express = require('express');
// const { Op } = require('sequelize');
// const router = express.Router();
// // put post 대기
// router.put('/posts/:postId/like', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = res.locals.user.dataValues;
//     const { postId } = req.params;
//     const post = await Posts.findOne({ postId });
//     const like = await Likes.findOne({
//       where: {
//         [Op.and]: [{ userId: userId }, { postId: postId }],
//       },
//     });
//     if (!post) {
//       return res
//         .status(404)
//         .json({ errorMassage: '게시글이 존재하지 않습니다.' });
//     }
//     if (like === null) {
//       await Likes.create({ UserId: userId, PostId: postId });
//       res.json({ message: '게시물 좋아요 등록에 성공하였습니다. ' });
//     } else {
//       await Likes.destroy({
//         where: {
//           [Op.and]: [{ userId: userId }, { postId: postId }],
//         },
//       });
//       res.json({ message: '게시물 좋아요를 취소하였습니다.' });
//     }
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ errorMassage: '게시글 좋아요에 실패하였습니다' });
//   }
// });
// //왜 api에 /posts/like 를하는데 /posts로 되는지 모르겠습니다.
// router.get('/like', authMiddleware, async (req, res) => {
//   try {
//     const { userId } = res.locals.user;
//     const like = await Likes.findAll({ where: { userId } });
//     const likeCnt = like.length;

//     const posts = await Posts.findAll({
//       include: [{ model: Users, attributes: ['nickname'] }],
//       attributes: ['postId', 'UserId', 'title', 'createdAt', 'updatedAt'],
//       order: [['createdAt', 'DESC']],
//     });

//     const results = posts.map(a => {
//       return {
//         postId: a.postId,
//         userId: a.UserId,
//         nickname: a.User.nickname,
//         title: a.title,
//         createdAt: a.createdAt,
//         updatedAt: a.updatedAt,
//         like: likeCnt,
//       };
//     });
//     return res.status(200).json({ posts: results });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ errorMassage: '좋아요 게시글 조회에 실패하였습니다.' });
//   }
// });

// router.delete('/b', authMiddleware, async (req, res) => {
//   const { userId } = res.locals.user.dataValues;
//   await Likes.destroy({ where: { userId } });
//   res.json({ message: '삭제' });
// });

// module.exports = router;
