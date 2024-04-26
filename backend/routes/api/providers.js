const express = require('express');

const { User, Patient, Provider, ProviderPatient } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, validateProviderCreation } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { ageCalc } = require('../../utils/dateFuncs')

const router = express.Router();

// ! Get all providers
router.get(
    '/all',
    requireAuth,
    async (req, res, next) => {
      const returnArr = await User.findAll({
        where: {
            providerBool: true 
        },
        include: [
            {
                model: Provider,
                attributes: [ 
                    "specialty", "title", "id", "userId"
                ]
            }
        ],
        attributes: [
            "firstName", "lastName", "email", "phone"
        ],
      });
      
      return res.json(returnArr); 
    }
  );

// ! Get all abbv pts for a single provider
router.get(
    '/current/patients',
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

        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ providerRes: ", providerRes)
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@")

        if(!providerRes.dataValues){
            const emptyArr= [];
            return res.json(emptyArr)
        }

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


// ! Get full provider by id
router.get(
    '/:providerId',
    async (req, res, next) => {
        const pvdObj = await Provider.findOne({
            where: {
                id: req.params.providerId
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
        
        return res.json(pvdObj)
    }
  );

// !  Update provider by id
router.put(
    "/:providerId", 
    requireAuth, 
    validateProviderCreation,
    async (req, res, next) => {
        const {specialty, title } = req.body;

        const pvdToUpdate = await Provider.findOne({
            where: {
                id: req.params.providerId
            },
            attributes: [
                'id', 'userId', 'specialty', 'title'
            ]
        })

        if (!pvdToUpdate) {
            const err = new Error("Provider couldn't be found");
            err.status = 404;
            return next(err);
        }

        const { user } = req;
        const userId = user.id;
        const pvdUserId = pvdToUpdate.userId;
        if (userId !== pvdUserId) {
            const err = new Error("Forbidden");
            err.title = 'Forbidden';
            err.errors = { message: 'Forbidden' };
            err.status = 403;
            return next(err);
        }   

          const updatedData = {
            userId, 
            specialty,
            title
        };

        const filter = {where: {}}

        const updatedPvd = await Provider.update(updatedData, filter );

        const newPvdData = await Provider.findOne({
            where: {
                id: req.params.providerId
            },
            attributes: [
                "id","userId", "specialty", "title"
            ]
        })

        return res.json(newPvdData)


    })





// ! Add a new provider 
router.post(
    "/", 
    requireAuth, 
    validateProviderCreation,
    async (req, res, next) => {
        const {specialty, title } = req.body;
        const { user } = req;
        const userId = user.id;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ userId: ", userId)
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@")
        const newProvider = await Provider.create({
            userId, 
            specialty,
            title
        });

        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ newProvider: ", newProvider)
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        // const createdProvider = {
        //     id: newProvider.id,
        //     userId: newProvider.userId,
        //     specialty: newProvider.specialty, 
        //     title: newProvider.title,
        //     createdAt: newProvider.createdAt,
        //     updatedAt: newProvider.updatedAt
        // };

        return res.status(201).json(newProvider)


    })


  module.exports = router;
