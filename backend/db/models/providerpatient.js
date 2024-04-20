'use strict';
const {
  Model
} = require('sequelize');

console.log("patientProvider model file is running")

module.exports = (sequelize, DataTypes) => {
  class ProviderPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ProviderPatient.hasMany(
      //   models.Patient,
      //   {
      //     foreignKey: 'patientId',
      //   }
      // ),
      // Patient.belongsToMany(
      //   models.Providers,
      //   {
      //     through: models.ProviderPatient,
      //   }
      // ),
      // Provider.belongsToMany(
      //   models.Patients,
      //   {
      //     through: models.ProviderPatient,
      //   }
      // )
      // ProviderPatient.hasMany(
      //   models.Provider,
      //   {
      //     foreignKey: 'providerId',
      //   }
      // )
    }
  }
  ProviderPatient.init({
    providerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'ProviderPatient',
  });
  return ProviderPatient;
};
