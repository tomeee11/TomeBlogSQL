const express = require('express');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/signup.route');
const postsRouter = require('./routes/posts.route');
const commentsRouter = require('./routes/comments.route');
const likesRouter = require('./routes/likes.route');
const app = express();
const PORT = 3018;
app.use(express.json());
app.use(cookieParser());
app.use('/', [usersRouter, postsRouter, commentsRouter, likesRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});

//socket
const { Server } = require('http');
const socketIo = require('socket.io');
const port = 3000;

const http = Server(app);
const io = socketIo(http);

io.on('/', sock => {
  console.log('새로운 소켓이 연결되었습니다.');
  socket.emit('customEventName', 'this is custom event data');
  sock.emit('BUY_GOODS', {
    nickname: '서버가 보내준 구매자 닉네임',
    goodsId: 10, // 서버가 보내준 상품 데이터 고유 ID
    goodsName: '서버가 보내준 구매자가 구매한 상품 이름',
    date: '서버가 보내준 구매 일시',
  });

  sock.on('BUY', data => {
    console.log('구매한 정보입니다.');
    console.log(data);
  });

  sock.on('disconnect', () => {
    console.log(`${sock.id}에 해당하는 사용자가 연결을 종료하였습니다.`);
  });
});

http.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요.');
});
