// routes/users.route.js

const express = require("express");
const { Users, UserInfos } = require("../models");
const router = express.Router();

router.post("/signup", async (req, res) => {
    const {email, password, name, age, gender, profileimage} =req.body
    const isExisUser = await Users.findOne({ where: ({ email: email})})
    if(isExisUser){
        return res.status(409).json({errorMessage: "이미 존재하는 이메일입니다."})
    }

    const user = await Users.create({ email, password })

    await UserInfos.create({
        UserId: user.userId,
        name, age, gender, profileimage })

    return res.status(201).json({ message: "회원가입이 완료되었습니다."})
})

module.exports = router;