const express = require('express');

const { User, Patient, Provider } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { ageCalc } = require('../../utils/dateFuncs')

const router = express.Router();
router.get(
    '/',
    async (req, res, next) => {
      const returnArr = await User.findAll({
        where: {
            providerBool: false 
        },
        include: [
            {
                model: Patient,
                attributes: [ 
                    "userId", "sex", "dob"
                ]
            }
        ],
        attributes: [
            "firstName", "lastName", "email", "phone"
        ],
        // group: ["User.id"],
        // raw: true
      });

      returnArr.forEach(ptObj => {
        // console.log(ptObj)
        const ageInYrs = ageCalc(ptObj.dataValues.Patient.dob)
        ptObj.dataValues.Patient.dataValues.age = ageInYrs;
        // console.log(ptObj)

      });
      
    //   console.log(returnArr)

      return res.json(returnArr); 
    }
  );


  module.exports = router;
