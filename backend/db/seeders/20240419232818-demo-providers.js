'use strict';

const { Provider } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

console.log("provider seeder file is running")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Provider.bulkCreate([
    {
      userId: 2,
      title: "MD",
      specialty: "Family Medicine"
    },
    {
      userId: 3,
      title: "RN",
      specialty: "None"
    },
    {
      userId: 7,
      title: "DO",
      specialty: "Pediatrics"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Providers';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {[Op.in]: [2, 3, 7]}
    }, {})
  }
};
