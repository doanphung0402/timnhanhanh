'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Test.belongsTo(models.User, { foreignKey: 'uid', targetKey: 'id', as: 'userData' })
    }
  }
  Test.init({
    uid: DataTypes.STRING,
    pid: DataTypes.STRING,
    score: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Test',
  });
  return Test;
};