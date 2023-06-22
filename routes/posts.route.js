const { Posts, Users } = require("../models");
const authMiddleware = require("../middlewares/middleware");
const express = require("express");
const router = express.Router();

router.post("/posts", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { userId } = res.locals.user;

  if (!title) {
    return res
      .status(412)
      .json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다." });
  }

  if (!content) {
    return res
      .status(412)
      .json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
  }

  try {
    await Posts.create({
      UserId: userId,
      title,
      content,
    });

    return res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "게시글 작성에 실패하였습니다." });
  }
});

router.get("/posts", async (req, res) => {
  const posts = await Posts.findAll({
    include: [{ model: Users, attributes: ["nickname"] }],
    attributes: ["postId", "UserId", "title", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  });
  try {
    const results = posts.map((a) => {
      return {
        postId: a.postId,
        userId: a.UserId,
        nickname: a.User.nickname,
        title: a.title,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });
    return res.status(200).json({ posts: results });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "게시글 조회에 실패하였습니다." });
  }
});

router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await Posts.findOne({
    where: { postId },
    include: [{ model: Users, attributes: ["nickname"] }],
    attributes: [
      "postId",
      "title",
      "UserId",
      "content",
      "createdAt",
      "updatedAt",
    ],
  });
  try {
    return res.status(200).json({
      posts: {
        postId: post.postId,
        userId: post.UserId,
        nickname: post.nickname,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "게시글 조회에 실패하였습니다." });
  }
});

router.put("/posts/:postId", authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const post = await Posts.findOne({ where: { postId } });

  if (!title) {
    return res
      .status(412)
      .json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다." });
  }
  if (!content) {
    return res
      .status(412)
      .json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
  }
  if (post.UserId !== userId) {
    return res
      .status(412)
      .json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
  }

  try {
    await Posts.update({ title, content }, { where: { postId } });
    res.status(200).json({ message: "게시글을 수정하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "게시글 수정에 실패하였습니다." });
  }
});

router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;
  const post = await Posts.findOne({ where: { postId } });

  if (post.UserId !== userId) {
    return res
      .status(412)
      .json({ errorMessage: "게시글 수정의 권한이 존재하지 않습니다." });
  }

  try {
    if (postId) {
      await Posts.destroy({ where: { postId } });
      res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } else {
        return res.status(404).json({errorMessage:"게시글이 존재하지 않습니다."})
    }
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "게시글 삭제에 실패하였습니다." });
  }
});

module.exports = router;
