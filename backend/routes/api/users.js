const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
    '/',
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
