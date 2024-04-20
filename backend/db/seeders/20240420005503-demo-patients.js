'use strict';

const { Patient } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

console.log("patient seeder file is running");

/** @type {import('sequelize-cli').Migration} */

console.log("patient seeder file is still running");

module.exports = {
  async up (queryInterface, Sequelize) {
    console.log("patient seeder file is still running");
    await Patient.bulkCreate([
      {
        userId: 1,
        dob: "01-15-1999",
        sex: "M",
        gender: "Transgender Man",
        insurance: "BCBS",
        religion: "Jewish",
        relationshipStatus: "Married",
        language: "English",
        ethnicity: "White",
        street:"23 Dunkard Ave",
        city:"Uniontown",
        state:"PA",
        name911:"Keiran Krawa",
        phone911:"4077937788",
        street911:"23 Dunkard Ave",
        city911:"Uniontown",
        state911:"PA",
        relationship911:"Spouse",
        pharmName:"Hixenbaugh's Drug Store",
        pharmStreet:"304 Morgantown St",
        pharmCity:"Uniontown",
        pharmState:"PA",
      },
      {
        userId: 4,
        dob: "01-09-1965",
        sex: "M",
        gender: "Cisgender Man",
        insurance: "United",
        religion: "Catholic",
        relationshipStatus: "Married",
        language: "English",
        ethnicity: "White",
        street:"123 Main Street",
        city:"Smallestown",
        state:"FL",
        name911:"Kim Kozlowski",
        phone911:"1234567890",
        street911:"123 Main Street",
        city911:"Smallestown",
        state911:"FL",
        relationship911:"Spouse",
        pharmName:"Walmart",
        pharmStreet:"456 County Rd",
        pharmCity:"Mediumtown",
        pharmState:"FL",
      },
      {
        userId: 5,
        dob: "07-06-1999",
        sex: "F",
        gender: "Nonbinary",
        insurance: "Cigna",
        religion: "Atheist",
        relationshipStatus: "Single",
        language: "English",
        ethnicity: "White",
        street:"2345 NW 30th Ave",
        city:"Smallcity",
        state:"FL",
        name911:"Tate Jones",
        phone911:"5552198765",
        street911:"987 River Rd",
        city911:"Bigcity",
        state911:"FL",
        relationship911:"Partner",
        pharmName:"Publix",
        pharmStreet:"87 Pleasant St",
        pharmCity:"Smallcity",
        pharmState:"FL",
      },
      {
        userId: 6,
        dob: "05-16-1999",
        sex: "M",
        gender: "Nonbinary",
        insurance: "None",
        religion: "Agnostic",
        relationshipStatus: "Single",
        language: "English",
        ethnicity: "White",
        street:"20834 SE 6 Blvd",
        city:"Smalltown",
        state:"FL",
        name911:"Lynne Byrne",
        phone911:"5552345678",
        street911:"456 Elm St",
        city911:"Smalltown",
        state911:"FL",
        relationship911:"Grandmother",
        pharmName:"Publix",
        pharmStreet:"926 Oak Lane",
        pharmCity:"Smalltown",
        pharmState:"FL",
      },
      {
        userId: 8,
        dob: "12-15-1980",
        sex: "F",
        gender: "Cisgender Woman",
        insurance: "Aetna",
        religion: "Muslim",
        relationshipStatus: "Widowed",
        language: "English",
        ethnicity: "Middle Eastern",
        street:"678 Cedar Ave",
        city:"Metropolis",
        state:"IL",
        name911:"Alex Taylor",
        phone911:"5556781234",
        street911:"678 Cedar Ave",
        city911:"Metropolis",
        state911:"IL",
        relationship911:"Friend",
        pharmName:"Rite Aid",
        pharmStreet:"3498 NE 108 Ave",
        pharmCity:"Metropolis",
        pharmState:"IL",
      },
    ],
    // { validate: true }
    )
    console.log("patient seeder file is even still running");
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Patients';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: {[Op.in]: [1, 
        4, 
        5, 
        6, 
        8
      ]}
    }, {})
  }
};
