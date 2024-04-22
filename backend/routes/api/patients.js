const express = require('express');

const { User, Patient, Provider, ProviderPatient } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { ageCalc } = require('../../utils/dateFuncs')

const router = express.Router();


// ! Get full pt by id
router.get(
    '/:patientId',
    async (req, res, next) => {
        const ptObj = await Patient.findOne({
            where: {
                id: req.params.patientId
            },
            attributes: [
                'id', 'userId', 'sex', 'dob', 'gender', 'insurance', 'religion','relationshipStatus','language', 'ethnicity','street', 'city','state','name911','phone911','street911','city911','state911','relationship911','pharmName','pharmStreet','pharmCity','pharmState'
            ]
        })

        if (!ptObj) {
            const err = new Error("Patient couldn't be found");
            err.status = 404;
            return next(err);
        }
        
        //adding age
        const ageInYrs = ageCalc(ptObj.dataValues.dob)
        ptObj.dataValues.age = ageInYrs;
        
        return res.json(ptObj)
    }
  );

// ! Get all abbv pts for a single provider
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const {user} = req;
        const userId = user.id;
        const where = {};
        where.userId = userId;
        const providerRes = await Provider.findOne({
            where,
            attributes: ['id']
        })

        providerId = providerRes.dataValues.id;

        const pvdPtArr = await ProviderPatient.findAll({
            where: {
                providerId: providerId,
            },
            attributes: ['patientId', 'providerId'],
        })

        let ptArr = [];

        for (let i = 0; i < pvdPtArr.length; i++) {
            const pvdPtRltn = pvdPtArr[i];
            const ptObj = await Patient.findOne({
                where: {
                    id: pvdPtRltn.patientId
                },
                include: [
                    {
                        model: User,
                        attributes: [ 
                            "firstName", "lastName", "email", "phone"
                        ],
                    }
                ],
                attributes: [
                    'id', "userId", "sex", "dob"
                ]
            })

            //reformatting
            ptObj.dataValues.firstName = ptObj.dataValues.User.firstName;
            ptObj.dataValues.lastName = ptObj.dataValues.User.lastName;
            ptObj.dataValues.email = ptObj.dataValues.User.email;
            ptObj.dataValues.phone = ptObj.dataValues.User.phone;
            delete ptObj.dataValues.User

            //adding age
            const ageInYrs = ageCalc(ptObj.dataValues.dob)
            ptObj.dataValues.age = ageInYrs;

            ptArr.push(ptObj)
            
        }

        console.log(ptArr)

        return res.json(ptArr);
    }
  );

// ! Get all abbv pts
router.get(
    '/',
    requireAuth,
    async (req, res, next) => {
      const returnArr = await User.findAll({
        where: {
            providerBool: false 
        },
        include: [
            {
                model: Patient,
                attributes: [ 
                    "userId", "sex", "dob", "id"
                ]
            }
        ],
        attributes: [
            "firstName", "lastName", "email", "phone"
        ],
      });

      returnArr.forEach(ptObj => {
        const ageInYrs = ageCalc(ptObj.dataValues.Patient.dob)
        ptObj.dataValues.Patient.dataValues.age = ageInYrs;
      });
      
      return res.json(returnArr); 
    }
  );


  module.exports = router;
