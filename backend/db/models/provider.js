'use strict';
const {
  Model
} = require('sequelize');

console.log("provider model file is running")

module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provider.belongsTo(
        models.User,
        {
          foreignKey:'id',
          onDelete: 'CASCADE'
        }
      )
      Provider.belongsToMany(
        models.Patient,
        {
          through: models.ProviderPatient,
          foreignKey: 'providerId',
          otherKey:'patientId'
        }
      )
    }
  }
  Provider.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Provider',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Provider;
};
