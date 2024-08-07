'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Patients', key: "id"},
        onDelete: "CASCADE"
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Providers', key: "id"},
        onDelete: "CASCADE"
      },
      apptType: {
        type: Sequelize.STRING,
        allowNull:false
      },
      chiefComplaint: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName="Appointments";
    await queryInterface.dropTable(options);
  }
};
