'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users', key: "id"},
        onDelete: "CASCADE"

      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false
      },
      sex: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull:false
      },
      insurance: {
        type: Sequelize.STRING
      },
      religion: {
        type: Sequelize.STRING
      },
      relationshipStatus: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      ethnicity: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name911: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone911: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      street911: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city911: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state911: {
        type: Sequelize.STRING,
        allowNull: false
      },
      relationship911: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pharmName: {
        type: Sequelize.STRING
      },
      pharmStreet: {
        type: Sequelize.STRING
      },
      pharmCity: {
        type: Sequelize.STRING
      },
      pharmState: {
        type: Sequelize.STRING
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
    options.tableName = "Patients";
    await queryInterface.dropTable(options);
  }
};
