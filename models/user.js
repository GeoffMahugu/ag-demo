'use strict';
const bet = require('./bet');

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user.hasMany(models.bet, { foreignKey: 'userId' });
    }
  };
  user.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false // Automatically gets converted to SERIAL for postgres
    },
    name: DataTypes.STRING,
    balance: { type: DataTypes.FLOAT, defaultValue: (0.0).toFixed(1) },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};

