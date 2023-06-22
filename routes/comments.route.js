const { Posts, Users, Comments } = require("../models");
const authMiddleware = require("../middlewares/middleware");
const { Op } = require('sequelize');
const express = require("express");
const router = express.Router();

router.post("/posts/:postId/comments", authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const { comment } = req.body;
  if (!postId) {
    return res.status(400).json({ Message: "게시글이 존재하지 않습니다." });
  }
  if (!comment) {
    res.status(412).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
  try {
    const a = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });
    console.log(a);
    res.status(201).json({ message: "댓글을 생성하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "댓글 작성에 실패하였습니다." });
  }
});

router.get("/posts/:postId/comments/:commentId", async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(404).json({ errorMessage: "게시글이 존재하지 않습니다" });
  }
  try {
    const comment = await Comments.findAll({
      where: { PostId: postId },
      include: [
        { model: Users, attributes: ["nickname"] },
        { model: Posts, attributes: ["title", "content"] },
      ],
      attributes: [
        "PostId",
        "UserId",
        "commentId",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    const results = comment.map((a) => {
      return {
        postId: a.PostId,
        userId: a.UserId,
        commentId: a.commentId,
        nickname: a.User.nickname,
        title: a.Post.title,
        content: a.Post.content,
        comment: a.comment,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });
    res.json({ comment:results });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: "댓글 조회에 실패하였습니다." });
  }
});

router.put("/posts/:postId/comments/:commentId", authMiddleware, async (req, res) => {
    const {postId} = req.params;
    const {commentId} = req.params;
    const {comment} = req.body;
    const { userId } = res.locals.user;
    const comments = await Comments.findOne({ where: { commentId } });
    if (!comment) {
        return res
          .status(412)
          .json({ errorMessage: "댓글 코멘트의 형식이 일치하지 않습니다." });
      }
      if (comments.UserId !== userId) {
        return res
          .status(412)
          .json({ errorMessage: "댓글 수정의 권한이 존재하지 않습니다." });
      }
    
    try {
        await Comments.update({ comment }, { where: {[Op.and]: [{ postId }, { commentId }]} });
        res.status(200).json({ message: "댓글을 수정하였습니다." });
      } catch (error) {
        return res
          .status(400)
          .json({ errorMessage: "댓글 수정에 실패하였습니다." });
      }
})

router.delete("/posts/:postId/comments/:commentId", authMiddleware, async (req, res) => {
    const {postId} = req.params;
    const {commentId} = req.params;
    const { userId } = res.locals.user;
    const comments = await Comments.findOne({ where: { commentId } });
      if (comments.UserId !== userId) {
        return res
          .status(412)
          .json({ errorMessage: "댓글 삭제의 권한이 존재하지 않습니다." });
      }
    try {
        await Comments.destroy( { where: {[Op.and]: [{ postId }, { commentId }]} });
        res.status(200).json({ message: "댓글을 삭제하였습니다." });
      } catch (error) {
        return res
          .status(400)
          .json({ errorMessage: "댓글 삭제에 실패하였습니다." });
      }
})
module.exports = router;
