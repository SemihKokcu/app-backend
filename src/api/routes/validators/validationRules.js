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
module.exports = { 
  userValidationRules,
  roleValidationRules,
  claimValidationRules,
  categoryValidationRules,
};
