const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/signup.route.js");
const postsRouter = require("./routes/posts.route.js");
const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use('/', [usersRouter, postsRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})

