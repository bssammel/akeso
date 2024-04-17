const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
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
      .isLength({ min: 10, max:10 })
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
  
      return res.json({
        user: safeUser
      });
    }
  );

  module.exports = router;
