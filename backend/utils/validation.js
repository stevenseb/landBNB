// backend/utils/validation.js
const { validationResult, check } = require('express-validator');
//process.env.NODE_ENV = 'production';
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


// VALIDATOR FOR NEW SIGNUPS
const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your first name.'),
    check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your last name.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

//VALIDATE USER LOGIN INPUT
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];
//VALIDATE SPOT INPUT FOR CREATE NEW SPOT
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Address is required.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required.'),
  check('state')
    .exists({checkFalsy: true})
    .withMessage('State is requried.'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required.'),
  // check('lat')
  //   .exists({ checkFalsy: true })
  //   .isFloat({ min: -90, max: 90 })
  //   .withMessage('Lattitude is not valid.'),
  // check('lng')
  //   .exists({checkFalsy: true})
  //   .isFloat({ min: -180, max: 180 })
  //   .withMessage('Longitute is not valid.'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required.')
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be less than 50 characters.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required.'),
  check('price')
    .exists({ checkFalsy: true })
    .isFloat({ min:0 })
    .withMessage('Price per day is required.'),
  handleValidationErrors
];

//VALIDATE CREATE NEW REVIEW INPUT
const validateReview = [
check('review')
  .exists({ checkFalsy: true })
  .withMessage('Review text is required.'),
check('stars')
  .exists({ checkFalsy: true, checkNull: true })
  .isInt({ min: 1, max: 5 })
  .withMessage('Stars must be an integer from 1 to 5.'),
  handleValidationErrors
];

// VALIDATE MIN MAX PRICE QUERY
const validatePriceQuery = [
    check('minPrice').optional().isInt({ min: 0 }).withMessage('Minimum price must be a number greater than or equal to 0'),
    check('maxPrice').optional().isInt({ min: 0 }).withMessage('Maximum price must be a number greater than or equal to 0'),
    handleValidationErrors
  ];



// VALIDATE MIN MAX LAT QUERY
const validateLatQuery = [
    check('minLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Minimum latitude is not valid.')
        .custom((value) => {
            if (!/^-?\d{1,3}\.\d{6}$/.test(value)) {
                throw new Error('Minimum latitude is not valid.');
            }
            return true;
        }),
    check('maxLat')
        .optional()
        .isFloat({ min: -90, max: 90 })
        .withMessage('Maximum latitude is not valid.')
        .custom((value) => {
            if (!/^-?\d{1,3}\.\d{6}$/.test(value)) {
                throw new Error('Maximum latitude is not valid.');
            }
            return true;
        })
];


// VALIDATE MIN MAX LNG QUERY
const validateLngQuery = [
  check('minLng').optional().isFloat({ min: -180, max: 180 }).withMessage('Minimum longitude is not valid.'),
  check('maxLng').optional().isFloat({ min: -180, max: 180 }).withMessage('Maximum longitude is not valid.'),
  handleValidationErrors
];





module.exports = {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateSpot,
  validateReview,
  validatePriceQuery,
  validateLatQuery,
  validateLngQuery
};
