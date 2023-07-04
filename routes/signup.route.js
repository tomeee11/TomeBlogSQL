const express = require('express');
const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const router = express.Router();

// 회원가입
router.post('/signup', async (req, res) => {
  const { nickname, password, confirm } = req.body;
  const isExistUser = await Users.findOne({ where: { nickname } });

  if (isExistUser) {
    return res.status(412).json({ message: '중복된 닉네임입니다.' });
  }
  if (password !== confirm) {
    return res.status(412).json({ message: '패스워드가 일치하지 않습니다.' });
  }
  if (!nickname) {
    return res
      .status(412)
      .json({ message: '닉네임 형식이 일치하지 않습니다.' });
  }
  if (!password) {
    return res
      .status(412)
      .json({ message: '패스워드 형식이 일치하지 않습니다.' });
  }
  try {
    await Users.create({ nickname, password });

    return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    return res
      .status(400)
      .json({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  const { nickname, password } = req.body;
  const user = await Users.findOne({ where: { nickname } });
  if (!user || user.password !== password) {
    return res
      .status(412)
      .json({ errorMessage: '닉네임 또는 패스워드를 확인해주세요.' });
  }
  try {
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      'customized_secret_key'
    );
    res.cookie('authorization', `Bearer ${token}`);
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' });
  }
});

module.exports = router;
