const { Posts, Users, Likes, UserInfos } = require('../models');

class UserRepository {
  UserFind = async nickname => {
    const userfind = await Users.findOne({
      where: { nickname },
    });
    return userfind;
  };
  UserCreater = async (nickname, password) => {
    const user = await Users.create({
      nickname: nickname,
      password: password,
    });
    return user;
  };

  UserInfoCreater = async (name, age, gender, profileImage, userId) => {
    const userinfo = await UserInfos.create({
      UserId: userId,
      name: name,
      age: age,
      gender: gender,
      profileImage: profileImage,
    });
    return userinfo;
  };
}

module.exports = UserRepository;
