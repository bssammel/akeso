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
      // // define association here
      // ProviderPatient.hasMany(
      //   models.Patient,
      //   {
      //     foreignKey: 'patientId',
      //   }
      // ),
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
      // references:{
      //   model: Providers,
      //   key: 'id',
      // },
      // allowNull:false
    },
    patientId: {
      type: DataTypes.INTEGER,
      // references:{
      //   model: Patients,
      //   key: 'id',
      // },
      // allowNull:false
    }
  }, {
    sequelize,
    modelName: 'ProviderPatient',
  });
  return ProviderPatient;
};
