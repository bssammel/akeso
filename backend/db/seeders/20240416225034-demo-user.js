'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

console.log("seeder file is running")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email:'simonkrawa@simon.site',
        phone:'3524155409',
        firstName: 'Simon',
        lastName: 'Krawa',
        imageURL:'https://i.imgur.com/Dapg8Ng.jpeg',
        providerBool:false,
        hashedPassword: bcrypt.hashSync('simonPass')
      },
      {
        email:'keirankrawa@simon.site',
        phone:'4077937788',
        firstName: 'Keiran',
        lastName: 'Krawa',
        imageURL:'https://i.pinimg.com/564x/14/43/55/144355d7b36c5f646435423798281ce9.jpg',
        providerBool:true,
        hashedPassword: bcrypt.hashSync('keiranPass')
      },
      {
        email:'kim@simon.site',
        phone:'1234567890',
        firstName: 'Kimberly',
        lastName: 'Kozlowski',
        providerBool:true,
        hashedPassword: bcrypt.hashSync('kimPass')
      },
      {
        email:'sean@simon.site',
        phone:'2345678901',
        firstName: 'Sean',
        lastName: 'Kozlowski',
        providerBool:false,
        hashedPassword: bcrypt.hashSync('seanPass')
      },
      {
        email:'archie@simon.site',
        phone:'3456789012',
        firstName: 'Monarch',
        lastName: 'Lamerson',
        providerBool:false,
        hashedPassword: bcrypt.hashSync('archiePass')
      },
      {
        email:'lucas@simon.site',
        phone:'4567890123',
        firstName: 'Lucas',
        lastName: 'Barrs',
        providerBool:false,
        hashedPassword: bcrypt.hashSync('lucasPass')
      },
      {
        email:'provider@simon.site',
        phone:'5678901234',
        firstName: 'Demo',
        lastName: 'Provider',
        providerBool:true,
        hashedPassword: bcrypt.hashSync('providerPass')
      },
      {
        email:'patient@simon.site',
        phone:'6789012345',
        firstName: 'Demo',
        lastName: 'Patient',
        providerBool:false,
        hashedPassword: bcrypt.hashSync('providerPass')
      },
     ],{ validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['simonkrawa@simon.site','keirannkrawa@simon.site','kim@simon.site','sean@simon.site','archie@simon.site','lucas@simon.site','provider@simon.site','patient@simon.site']}
    }, {});
  }
};
