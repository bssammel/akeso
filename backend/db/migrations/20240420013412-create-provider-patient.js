'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

console.log("providerPatient migration file is running")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProviderPatients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'Providers',
          key: "id"
        }
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'Patients',
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'ProviderPatients'
    await queryInterface.dropTable(options);

  }
};
