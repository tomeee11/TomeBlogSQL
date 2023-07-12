const UserService = require('../services/users.service');
class UserController {
  userService = new UserService();

  UsersSighUp = async (req, res, next) => {
    const { nickname, password, confirm, name, age, gender, profileImage } =
      req.body;
    if (!(nickname, password, confirm, name, age, gender, profileImage)) {
      res
        .status(412)
        .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }
    if (password !== confirm) {
      res.status(412).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    try {
      await this.userService
        .SignUp(nickname, password, name, age, gender, profileImage)
        .catch(e => res.status(412).json({ errorMessage: e.message }));
      res.status(200).json({ message: ' 회원가입 되었습니다. ' });
    } catch (e) {
      res.status(400).json({
        errorMessage: e.message + '회원가입에 실패하였습니다',
      });
    }
  };
}

module.exports = UserController;
