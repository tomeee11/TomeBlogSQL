const express = require('express');
const { Users, UserInfos, sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Transaction } = require('sequelize');

// 회원가입
router.post('/signup', async (req, res) => {
  const { nickname, password, confirm, name, age, gender, profileImage } =
    req.body;
  const isExistUser = await Users.findOne({ where: { nickname } });

  if (isExistUser) {
    return res.status(412).json({ message: '중복된 닉네임입니다.' });
  }
  if (password !== confirm) {
    return res.status(412).json({ message: '패스워드가 일치하지 않습니다.' });
  }
  if (!(nickname, password, confirm, name, age, gender, profileImage)) {
    return res
      .status(412)
      .json({ message: '데이터 형식이 일치하지 않습니다.' });
  }
  const t = await sequelize.transaction({
    // 트렌잭션 객체 할당
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, //격리 수준 설정
  });

  try {
    const user = await Users.create({ nickname, password }, { transaction: t });

    await UserInfos.create(
      {
        UserId: user.userId,
        name,
        age,
        gender,
        profileImage,
      },
      { transaction: t }
    );
    await t.commit(); //성공하면 커밋
  } catch (transactionEror) {
    await t.rollback(); // 실패하면 롤백 (롤백시 데이터 저장 안됨//  문제 발생시 db에 데이터가 들어가는걸 방지)
    return res.status(400).json({ errorMessage: '회원가입에 실패하였습니다.' });
  }
  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
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
