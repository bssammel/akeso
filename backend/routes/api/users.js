const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ageCalc } = require('../../utils/dateFuncs')
const { User, Patient, Provider, Condition, Treatment } = require('../../db/models');
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

//!Create new user
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, firstName, lastName, providerBool, phone, imageURL } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const userWithEmailExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userWithEmailExists) {
      const err = new Error("User already exists");
      err.errors = { email: "User with that email already exists" };
      err.status = 500;
      return next(err);
    }

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

    return res.json({
      user: safeUser
    });
  }
);

//! Add User Type Reference ID to user for easy auth referencing
router.put(
  '/:userId/addRefId',
  requireAuth,
  async (req, res, next) => {
    console.log("hit line 90 of users.js")
    const { userId, providerBool, createdUserTypeId } = req.body;
    console.log("hit line 92 of users.js")
    
    //Find user with that email, can also pull user from req.userId? better option?
    const user = await User.findByPk(req.params.userId);
    console.log("hit line 96 of users.js")

    // error handling for when user is not found
    //user not found with id
    if(!user){
      const err = new Error("User couldn't be found");
      err.status = 404;
      return next(err);
    }
    console.log("hit line 105 of users.js")

    //great, we have that user, now we want to update the user with the type id

    const userUpdate = {
      id: user.id,
      userTypeRefId: createdUserTypeId,
    };

    const filter = {where: {}}

    const updatedUser = await User.update(userUpdate, filter );

    return res.json({
      user: updatedUser
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

      treatmentArr = await Treatment.findAll({
        where:{
          patientId: patientId
        },
        include: [
          { model: Provider}
        ],
        attributes:["providerId", "patientId", "id", "name", "dosage", "frequencyQuantity", "frequencyPeriod","conditionId"]
      })

      desiredUser.dataValues.Patient.dataValues.Treatments = treatmentArr;


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

    return res.json(desiredUser); 
  }
);

  module.exports = router;
