'use strict';
const {
  Model, Validator
} = require('sequelize');

// console.log("model file is running")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(
        models.Patient,
        {
          foreignKey: 'userId'
        }
      ),
      User.belongsTo(
        models.Provider,
        {
          foreignKey: 'userId'
        }
      )
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true
        }
    },
    phone:{
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 10],
          isNumeric: true
        }
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
        isAlpha: true
      }
    },
    imageURL: {
      type: DataTypes.STRING,
    },
    providerBool:{ 
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes:{
        exclude:["hashedPassword","createdAt","updatedAt"]//protecting sensitive information
      }
    }
  });
  return User;
};
