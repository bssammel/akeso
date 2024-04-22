'use strict';

const {
  Model, Validator
} = require('sequelize');

console.log("patient model file is running")

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(
        models.User,
        {
          as: "User",
          foreignKey:"userId",
          onDelete: "CASCADE"
        }
      ),
      Patient.belongsTo(
        models.User,
        {
          foreignKey:"userId",
          onDelete: "CASCADE"
        }
      ),
      Patient.belongsToMany(
        models.Provider,
        {
          through: models.ProviderPatient,
          foreignKey: 'patientId',
          otherKey:'providerId'
        }
      ),
      Patient.hasMany(
        models.Condition,
        {
          foreignKey: 'patientId'
        }
      )
    }
  }
  Patient.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull:false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        // len:[1,1],
        isAlpha: true
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull:false,
      // validate: {
      //   isAlpha: true
      // }
    },
    insurance: {
      type: DataTypes.STRING,
    },
    religion: {
      type: DataTypes.STRING,
    },
    relationshipStatus: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING
    },
    ethnicity: {
      type: DataTypes.STRING
    },
    street: {
      type: DataTypes.STRING,
      allowNull:false
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false
    },
    name911: {
      type: DataTypes.STRING,
      allowNull:false
    },
    phone911: {
      type: DataTypes.STRING(10),
      allowNull:false
    },
    street911: {
      type: DataTypes.STRING,
      allowNull:false
    },
    city911: {
      type: DataTypes.STRING,
      allowNull:false
    },
    state911: {
      type: DataTypes.STRING,
      allowNull:false
    },
    relationship911: {
      type: DataTypes.STRING,
      allowNull:false
    },
    pharmName: {
      type: DataTypes.STRING
    },
    pharmStreet: {
      type: DataTypes.STRING
    },
    pharmCity: {
      type: DataTypes.STRING
    },
    pharmState: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};
