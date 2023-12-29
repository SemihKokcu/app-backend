const { body } = require('express-validator');
const validImageExtensions = ['png', 'jpg', 'jpeg'];
const {validateImageFile,validateImageFiles} = require('./specailRules')

const userValidationRules = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6}).withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('surname').notEmpty().withMessage('Surname cannot be empty'),
  body('twoFactor').optional().isBoolean().withMessage('TwoFactor must be a boolean value'),
  body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('emailVerified').optional().isBoolean().withMessage('EmailVerified must be a boolean value'),
  body('phoneVerified').optional().isBoolean().withMessage('PhoneVerified must be a boolean value'),
  body('roles').optional().isArray().withMessage('Roles must be an array'),
  body('address').optional().isMongoId().withMessage('Invalid address ID'),
  validateImageFile('profileImage', validImageExtensions),
];

const roleValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('descp').optional().isString().withMessage('Description must be a string'),
];

const claimValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('descp').optional().isString().withMessage('Description must be a string'),
];

const categoryValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
];


const addressValidationRules = [
  body('userId').isMongoId().withMessage('Invalid userId'),
  body('buildingNumber').notEmpty().withMessage('Building number cannot be empty'),
  body('doorNumber').notEmpty().withMessage('Door number cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('city').notEmpty().withMessage('City cannot be empty'),
  body('country').notEmpty().withMessage('Country cannot be empty'),
  body('postalCode').notEmpty().withMessage('Postal code cannot be empty'),
];

const projectValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('descp').notEmpty().trim().withMessage('Description is required'),
  body('primaryImgUrl').optional().isURL().withMessage('Invalid URL for primaryImgUrl'),
  body('status').optional().isString().withMessage('Status must be a boolean'),
];


module.exports = { 
  userValidationRules,
  roleValidationRules,
  claimValidationRules,
  categoryValidationRules,
  addressValidationRules,
  projectValidationRules
};
