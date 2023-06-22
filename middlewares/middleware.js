const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  const { authorization } = req.cookies;
  const [tokenType, token] = authorization.split(" ");
  if (tokenType !== "Bearer" || !token) {
    return res
      .status(401)
      .json({
        message: "토큰 타입이 일치하지 않거나, 토큰이 존재하지 않습니다.",
      });
  }
  try {
    const decodedToken = jwt.verify(token, "customized_secret_key");
    const userId = decodedToken.userId;

    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      res.clearCookie("authorization");
      return res
        .status(401)
        .json({ message: "토큰 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;

    next();
  } catch (error) {
    res.clearCookie("authorization");
    return res.status(401).json({
      errorMessage: "전달된 쿠키에서 오류가 발생하였습니다.",
    });
  }
};
