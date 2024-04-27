const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const patientsRouter = require('./patients.js')
const providersRouter = require('./providers.js')
const conditionsRouter = require('./conditions.js')
const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser); //leave this at top above all other routes

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/patients', patientsRouter)

router.use('/providers', providersRouter)

router.use('/conditions', conditionsRouter )
// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });


module.exports = router;
