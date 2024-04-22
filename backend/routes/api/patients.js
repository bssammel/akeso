const express = require('express');

const { User, Patient, Provider, ProviderPatient } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validatePatientCreation } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { ageCalc } = require('../../utils/dateFuncs')

const router = express.Router();


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

// !  Update pt by id
// ! Add a new patient 
router.put(
    "/:patientId", 
    requireAuth, 
    validatePatientCreation,
    async (req, res, next) => {
        const {sex, dob, gender, insurance, religion, relationshipStatus, language, ethnicity, street, city, state, name911, phone911, street911, city911, state911, relationship911, pharmName, pharmStreet, pharmCity, pharmState } = req.body;
        const patientId = req.params.patientId;

        // const ptToUpdate = await Patient.findByPk(req.params.patientId);

        const ptToUpdate = await Patient.findOne({
            where: {
                id: req.params.patientId
            },
            attributes: [
                'id', 'userId', 'sex', 'dob', 'gender', 'insurance', 'religion','relationshipStatus','language', 'ethnicity','street', 'city','state','name911','phone911','street911','city911','state911','relationship911','pharmName','pharmStreet','pharmCity','pharmState'
            ]
        })

        if (!ptToUpdate) {
            const err = new Error("Patient couldn't be found");
            err.status = 404;
            return next(err);
        }

        const { user } = req;
        const userId = user.id;
        const ptUserId = ptToUpdate.userId;
        if (userId !== ptUserId) {
            const err = new Error("Forbidden");
            err.title = 'Forbidden';
            err.errors = { message: 'Forbidden' };
            err.status = 403;
            return next(err);
        }   

          const updatedData = {
            userId: userId,
            sex: sex, dob: dob, gender: gender, insurance: insurance, religion: religion, relationshipStatus: relationshipStatus, language: language, ethnicity: ethnicity, street: street, city: city, state: state, name911: name911, phone911: phone911, street911: street911, city911:city911, state911:state911, relationship911: relationship911, pharmName: pharmName, pharmStreet: pharmStreet, pharmCity: pharmCity, pharmState: pharmState
        };

        const filter = {where: {}}

        const updatedPt = await Patient.update(updatedData, filter );
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@")
        // console.log(updatedPt)

        // const ageInYrs = ageCalc(updatedPt.dataValues.dob)
        // updatedPt.dataValues.age = ageInYrs;

        const newPtData = await Patient.findOne({
            where: {
                id: req.params.patientId
            },
            attributes: [
                'id', 'userId', 'sex', 'dob', 'gender', 'insurance', 'religion','relationshipStatus','language', 'ethnicity','street', 'city','state','name911','phone911','street911','city911','state911','relationship911','pharmName','pharmStreet','pharmCity','pharmState'
            ]
        })

        return res.json(newPtData)

        // return res.status(201).json(createdPatient)


    })



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
            "firstName", "lastName", "email", "phone", "id"
        ],
      });

      returnArr.forEach(ptObj => {
        console.log(ptObj.dataValues)
        if(ptObj.dataValues.Patient){
            const ageInYrs = ageCalc(ptObj.dataValues.Patient.dob)
            ptObj.dataValues.Patient.dataValues.age = ageInYrs;
        }
      });
      
      return res.json(returnArr); 
    }
  );

// ! Add a new patient 
router.post(
    "/", 
    requireAuth, 
    validatePatientCreation,
    async (req, res, next) => {
        const {sex, dob, gender, insurance, religion, relationshipStatus, language, ethnicity, street, city, state, name911, phone911, street911, city911, state911, relationship911, pharmName, pharmStreet, pharmCity, pharmState } = req.body;
        const { user } = req;
        const userId = user.id;
        const newPatient = await Patient.create({
            userId, 
            sex,
            dob, 
            gender, 
            insurance, 
            religion, 
            relationshipStatus, 
            language, 
            ethnicity, 
            street, 
            city, 
            state, 
            name911, 
            phone911, 
            street911, 
            city911, 
            state911,
            relationship911, 
            pharmName, 
            pharmStreet, 
            pharmCity, 
            pharmState 
        });
        const createdPatient = {
            id: newPatient.id,
            userId: newPatient.userId,
            sex: newPatient.sex, dob: newPatient.dob, gender: newPatient.gender, insurance: newPatient.insurance, religion: newPatient.religion, relationshipStatus: newPatient.relationshipStatus, language: newPatient.language, ethnicity: newPatient.ethnicity, street: newPatient.street, city: newPatient.city, state: newPatient.state, name911: newPatient.name911, phone911: newPatient.phone911, street911: newPatient.street911, relationship911: newPatient.relationship911, pharmName: newPatient.pharmName, pharmStreet: newPatient.pharmStreet, pharmCity:newPatient.pharmCity, pharmState: newPatient.pharmState,
            age: ageCalc(newPatient.dob),
            createdAt: newPatient.createdAt,
            updatedAt: newPatient.updatedAt
        };

        return res.status(201).json(createdPatient)


    })


  module.exports = router;
