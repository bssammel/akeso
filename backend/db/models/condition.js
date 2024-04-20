'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Condition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Condition.belongsTo(
        models.Patient,
        {
          foreignKey:"patientId",
          onDelete: "CASCADE"
        }
      ),
      Condition.belongsTo(
        models.Provider,
        {
          foreignKey:"providerId",
          onDelete: "CASCADE"
        }
      )
    }
  }
  Condition.init({
    patientId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name:  {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len:[1,75],
      }
    },
    description:  {
      type: DataTypes.STRING,
      validate: {
        len:[0, 2000]
      }
    },
    status:  {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len:[1,30],
      }
    },
  }, {
    sequelize,
    modelName: 'Condition',
  });
  return Condition;
};
