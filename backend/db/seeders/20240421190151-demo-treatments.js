'use strict';

const { Treatment } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

console.log("treatment seeder file is running")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Treatment.bulkCreate([
      {
        patientId: 1,
        providerId:1,
        conditionId: 1,
        name: "Physical Therapy",
        dosage: "Not Applicable",
        frequencyQuantity: 2,
        frequencyPeriod: "week"
      },
      {
        patientId: 1,
        providerId:3,
        conditionId: 2,
        name: "Buspirone",
        dosage: "10mg",
        frequencyQuantity: 3,
        frequencyPeriod: "day"
      },
      {
        patientId: 1,
        providerId:3,
        conditionId: 3,
        name: "Bupropion",
        dosage: "300mg",
        frequencyQuantity: 1,
        frequencyPeriod: "day"
      },
      {
        patientId: 3,
        providerId:1,
        conditionId: 6,
        name: "Levothyroxine",
        dosage: "50mcg",
        frequencyQuantity: 1,
        frequencyPeriod: "day"
      },
      {
        patientId: 3,
        providerId:3,
        conditionId: 7,
        name: "Methylphenidate",
        dosage: "20mg",
        frequencyQuantity: 2,
        frequencyPeriod: "day"
      },
      {
        patientId: 4,
        providerId:1,
        conditionId: 8,
        name: "Timolol",
        dosage: "0.5% eye drops",
        frequencyQuantity: 2,
        frequencyPeriod: "day"
      },
      {
        patientId: 4,
        providerId:1,
        conditionId: 9,
        name: "Lithium Carbonate",
        dosage: "300mg",
        frequencyQuantity: 2,
        frequencyPeriod: "day"
      },
      {
        patientId: 5,
        providerId:3,
        conditionId: 10,
        name: "Methotrexate",
        dosage: "15mg",
        frequencyQuantity: 1,
        frequencyPeriod: "week"
      },
      {
        patientId: 5,
        providerId:3,
        conditionId: 10,
        name: "Ibuprofen",
        dosage: "200mg",
        frequencyPeriod: "As Needed"
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
  }
};
