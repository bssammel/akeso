'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

console.log('condition migration file is running')

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
        references: {model: 'Patients'},
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Providers'},
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING
      },
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
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
      }, 
      options});
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Conditions';
    await queryInterface.dropTable(options);
  }
};
