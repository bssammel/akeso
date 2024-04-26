const express = require('express');


const { User, Patient, Provider, ProviderPatient } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validatePatientCreation } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { ageCalc } = require('../../utils/dateFuncs')

const router = express.Router();

// ! Get all providers for current patient
router.get(
    '/:patientId/providers',
    requireAuth,
    async (req, res) => {
        const {user} = req;
        const userId = user.id;
        console.log("userId", userId)
        const where = {};
        where.userId = userId;
        const patientRes = await Patient.findOne({
            where,
            attributes: ["id"]
        })

        console.log("############################################")
        console.log(patientRes)

        patientId = patientRes.dataValues.id;

        const pvdPtArr = await ProviderPatient.findAll({
            where: {
                patientId: patientId,
            },
            attributes: ['patientId', 'providerId'],
        })

        let pvdArr = [];

        for (let i = 0; i < pvdPtArr.length; i++) {
            const pvdPtRltn = pvdPtArr[i];
            const pvdObj = await Provider.findOne({
                where: {
                    id: pvdPtRltn.providerId
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
                    'id', "userId", "title", "specialty"
                ]
            })

            //reformatting
            pvdObj.dataValues.firstName = pvdObj.dataValues.User.firstName;
            pvdObj.dataValues.lastName = pvdObj.dataValues.User.lastName;
            pvdObj.dataValues.email = pvdObj.dataValues.User.email;
            pvdObj.dataValues.phone = pvdObj.dataValues.User.phone;
            delete pvdObj.dataValues.User

            pvdArr.push(pvdObj)
            
        }

        console.log(pvdArr)

        return res.json(pvdArr);
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
            include: [{model: User}],
            attributes: [
                'id', 'userId', 'sex', 'dob', 'gender', 'insurance', 'religion','relationshipStatus','language', 'ethnicity','street', 'city','state','name911','phone911','street911','city911','state911','relationship911','pharmName','pharmStreet','pharmCity','pharmState'
            ]
        })

        if (!ptObj) {
            const err = new Error("Patient couldn't be found");
            err.message = "Patient couldn't be found!"
            err.status = 404;
            return res.json(err)
            // return next(err);
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

        
        const ageInYrs = ageCalc(newPatient.dataValues.dob)
        newPatient.dataValues.age = ageInYrs;
    
        return res.status(201).json(newPatient)

    })


  module.exports = router;
