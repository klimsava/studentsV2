const {check, validationResult} = require('express-validator');

exports.checkValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.array()[0].msg;

    return res.status(422).json({
      success: false,
      error: error
    });
  }

  next();
};

exports.studentsValidators = [
  check('first_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First name is required!')
    .isLength({min:3, max:20})
    .withMessage('First name must be 3 to 20 characters long!'),
  check('last_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last name is required!')
    .isLength({min:3, max:30})
    .withMessage('Last name must be 3 to 30 characters long!'),
  check('age')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Age is required!')
    .isNumeric()
    .withMessage('Age is number!')
    .isLength({min:1, max:2})
    .withMessage('Age must be 1 to 2 characters long!'),
];

exports.validatorsId = [
  check('id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('ID not found!')
    .isNumeric()
    .withMessage('ID a number type!'),
];

exports.coursesValidators = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Course name is required!')
    .isLength({min:3, max:20})
    .withMessage('Course name must be 3 to 20 characters long!'),
  check('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required!')
    .isLength({min:10, max:1000})
    .withMessage('Description must be 10 to 1000 characters long!'),
  check('time')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Time select is required!')
    .matches(/^[\d+]{2}:[\d+]{2}$/)
    .withMessage('Time format hh:mm'),
];
