'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserHistories.init({
    userId: DataTypes.INTEGER,
    beforeName: DataTypes.STRING,
    afterName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserHistories',
  });
  return UserHistories;
};