'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bet.belongsTo(models.user, { foreignKey: 'userId' });
    }
  };
  bet.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user', // name of Target model
        key: 'id', // key in Target model that we're referencing
      }
    },
    betAmount: { type: DataTypes.FLOAT, defaultValue: (0.0).toFixed(1) },
    chance: { type: DataTypes.FLOAT, defaultValue: (0.0).toFixed(1) },
    payout: { type: DataTypes.FLOAT, defaultValue: (0.0).toFixed(1) },
    win: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

  }, {
    sequelize,
    modelName: 'bet',
  });
  return bet;
};