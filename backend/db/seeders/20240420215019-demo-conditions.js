'use strict';

const { Condition } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

console.log("condition seeder file is running")


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Condition.bulkCreate([
    {
      patientId: 1,
      providerId: 1,
      name: "Joint Hypermobility Syndrome",
      description: "Identified post ATFL tear",
      status: "Worsening"
    },
    {
      patientId: 1,
      providerId: 3,
      name: "Generalized Anxiety Disorder",
      description: "Original DX with previous physician, managed",
      status: "Controlled"
    },
    {
      patientId: 1,
      providerId: 3,
      name: "Major Depressive Disorder",
      description: "Original DX with previous physician, managed",
      status: "Controlled"
    },
    {
      patientId: 2,
      providerId: 2,
      name: "Diabetes Mellitus Type 2",
      description: "Pt managing through dietary changes",
      status: "Controlled"
    },
    {
      patientId: 2,
      providerId: 2,
      name: "Hypertension",
      description: "Pt managing through dietary changes",
      status: "Controlled"
    },
    {
      patientId: 3,
      providerId: 1,
      name: "Hypothyroidism",
      status: "Controlled"
    },
    {
      patientId: 3,
      providerId: 3,
      name: "Attention-Deficit/Hyperactivity Disorder",
      status: "Controlled"
    },
    {
      patientId: 4,
      providerId: 1,
      name: "Ocular Hypertension",
      description: "Seemingly in remission due to treatment with decrease in symptoms",
      status: "Controlled"
    },
    {
      patientId: 4,
      providerId: 1,
      name: "Bipolar Disorder",
      description:"Struggling to manage with medication routine but pt has strong social support system",
      status: "Controlled"
    },
    {
      patientId: 5,
      providerId: 3,
      name: "Rheumatoid arthritis",
      status: "Controlled"
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Conditions"
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      providerId: {[Op.in]: [1, 2, 3]}
    })
  }
};
