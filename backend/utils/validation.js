const { validationResult, check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const validatePatientCreation = [
  check('sex')
    .exists({ checkFalsy: true })
    .isLength({min:1, max:1})
    .withMessage('Please provide your legal sex marker.'),
  check('dob')
    .exists({ checkFalsy: true })
    // .isDate()
    .withMessage('Please provide a valid birth date.'),
  check('gender')
    .exists({ checkFalsy: true })
    .withMessage('Please indicate the gender you identify most with.'),
  check('street')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your street address.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the name of the city you live in.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the name of the state you live in.'),
  check('name911')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the name of your emergency contact.'),
  check('phone911')
    .exists({ checkFalsy: true })
    .isLength(10)
    .isNumeric()
    .withMessage('Please provide the best phone number for your emergency contact. It must be exactly 10 characters long with no spaces or symbols'),
  check('street911')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the street address of your emergency contact.'),
  check('city911')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the city of your emergency contact.'),
  check('state911')
    .exists({ checkFalsy: true })
    .withMessage('Please provide the state of your emergency contact.'),
  check('relationship911')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your relationship to your emergency contact.'),
  handleValidationErrors]

module.exports = {
  handleValidationErrors, validatePatientCreation
};
