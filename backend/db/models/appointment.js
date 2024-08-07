'use strict';

const {
  Model, Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(
        models.Patient,
        {
          foreignKey:"patientId",
          onDelete: "CASCADE"
        }
      ),
      Appointment.belongsTo(
        models.Provider,
        {
          foreignKey:"providerId",
          onDelete: "CASCADE"
        }
      )      
    }
  }
  Appointment.init({
    patientId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    apptType: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    chiefComplaint: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255] // limit length for brevity
      }
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull:false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};
