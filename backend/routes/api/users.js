const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ageCalc } = require('../../utils/dateFuncs')
const { User, Patient, Provider, Condition } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Sign up
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 2 })
      .withMessage('Please provide a first name with at least 2 characters.'),
    check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
      .withMessage('Please provide a last name with at least 2 characters.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('providerBool')
      .isBoolean()
      .withMessage('Please indicate if you are a provider or patient.'),
    check('phone')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a phone number.'),
    check('phone')
      .exists({ checkFalsy: true })
      .isLength(10)
      .withMessage('Phone number must be 10 characters exactly.'),
    handleValidationErrors
  ];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, firstName, lastName, providerBool, phone, imageURL } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, firstName, lastName, providerBool, phone,  hashedPassword, imageURL });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        providerBool: user.providerBool,
        phone: user.phone,
        password: user.password,
        imageURL: user.imageURL
      };
  
      await setTokenCookie(res, safeUser);

      // if (safeUser.errors.email && safeUser.errors.email === "email must be unique"){
      //   safeUser.errors.email = "User with that email already exists"
      // }
  
      return res.json({
        user: safeUser
      });
    }
  );

  router.get(
    '/:userId',
    async (req, res, next) => {
      const desiredUserBeta = await User.findByPk(req.params.userId);

      //user not found with id
      if(!desiredUserBeta){
        const err = new Error("User couldn't be found");
        err.status = 404;
        return next(err);
      }

      let desiredUser = {}

      if (!desiredUserBeta.providerBool){//if the user fetched is a patient
          desiredUser = await User.findOne({
          where:{id:req.params.userId},
          include: [
            {model: Patient}
          ],
          // group: ["User.id", "Patient.id"]
        })
        const ageInYrs = ageCalc(desiredUser.dataValues.Patient.dob)
        desiredUser.dataValues.Patient.dataValues.age = ageInYrs;

        let patientId = desiredUser.dataValues.Patient.dataValues.id;

        conditionArr = await Condition.findAll({
          where:{
            patientId: patientId
          },
          include: [
            { model: Provider}
          ],
          attributes:["providerId", "patientId", "name", "status", "description", "id"]
        })

        desiredUser.dataValues.Patient.dataValues.Conditions = conditionArr;


      }
      if (desiredUserBeta.providerBool){//if the user fetched is a provider
        desiredUser = await User.findOne({
          where:{id:req.params.userId},
          include: [
            {
            model: Provider,}
          ],
        })
      }

      // console.log('desiredUser')
      // console.log(desiredUser)
      return res.json(desiredUser); 
    }
  );

  module.exports = router;
