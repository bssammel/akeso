const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Log in
router.post(
    '/',
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            email: credential
          }
        }
      });
  
      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }
  
      const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        providerBool: user.providerBool,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'Successfully logged out user.' });
    }
  );

  
// Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
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
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );

module.exports = router;
