'use strict';

const {
  Model, Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Treatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Treatment.belongsTo(
        models.Patient,
        {
          foreignKey:"patientId",
          onDelete: "CASCADE"
        }
      ),
      Treatment.belongsTo(
        models.Provider,
        {
          foreignKey:"providerId",
          onDelete: "CASCADE"
        }
      ),
      Treatment.belongsTo(
        models.Condition,
        {
          foreignKey:"conditionId",
          onDelete: "CASCADE"
        }
      )    
    }
  }
  Treatment.init({
    patientId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    conditionId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    dosage: {
      type: DataTypes.STRING,
    },
    frequencyQuantity: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },
    frequencyPeriod: {
      type: DataTypes.STRING(25),
    }
  }, {
    sequelize,
    modelName: 'Treatment',
  });
  return Treatment;
};
