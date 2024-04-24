'use strict';
const {
  Model
} = require('sequelize');

// import Patient from './patient'
// import Provider from './provider'

console.log("patientProvider model file is running")

module.exports = (sequelize, DataTypes) => {
  class ProviderPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProviderPatient.belongsTo(models.Patient, {
        foreignKey: 'patientId'
      })
      ProviderPatient.belongsTo(models.Provider, {
        foreignKey: 'providerId'
    })
    }
  }
  ProviderPatient.init({
    providerId: {
      type: DataTypes.INTEGER,
    },
    patientId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'ProviderPatient',
  });
  return ProviderPatient;
};
