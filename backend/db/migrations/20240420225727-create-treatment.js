'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Treatments', {
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
      conditionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Conditions', key: "id"},
        onDelete: "CASCADE"
      },
      name: {
        type: Sequelize.STRING
      },
      dosage: {
        type: Sequelize.STRING
      },
      frequencyQuantity: {
        type: Sequelize.DECIMAL
      },
      frequencyPeriod: {
        // week, day, month, year, as needed
        type: Sequelize.STRING(25)
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
    options.tableName = "Treatments";
    await queryInterface.dropTable(options);
  }
};
