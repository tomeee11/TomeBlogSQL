const UserRepository = require('../repositories/users.repository');

class UserService {
  userRepository = new UserRepository();

  SignUp = async (nickname, password, name, age, gender, profileImage) => {
    const users = await this.userRepository.UserFind(nickname);
    if (users) throw new Error('이미 존재하는 닉네임 입니다.');
    const user = await this.userRepository.UserCreater(nickname, password);
    await this.userRepository.UserInfoCreater(
      name,
      age,
      gender,
      profileImage,
      user.userId
    );
  };
}

module.exports = UserService;
