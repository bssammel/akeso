'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conditions', {
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
      name: {
        type: Sequelize.STRING(75)
      },
      description: {
        type: Sequelize.STRING(2000)
      },
      status: {
        type: Sequelize.STRING(30)
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
    options.tableName = "Conditions";
    await queryInterface.dropTable(options);
  }
};
