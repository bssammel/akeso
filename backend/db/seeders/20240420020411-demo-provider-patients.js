'use strict';

const { ProviderPatient } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

console.log("providerPatient seeder file is running");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await ProviderPatient.bulkCreate([
    {
      providerId: 1,
      patientId:1
    },
    {
      providerId: 1,
      patientId:3
    },
    {
      providerId: 1,
      patientId:4
    },
    {
      providerId: 2,
      patientId:1
    },
    {
      providerId: 2,
      patientId:2
    },
    {
      providerId: 3,
      patientId:3
    },
    {
      providerId: 3,
      patientId:5
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ProviderPatients';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      providerId: {[Op.in]: [1, 2, 3]}
    })
  }
};
