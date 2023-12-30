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

const aboutUsValidationRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('officalAddress').notEmpty().withMessage('Official Address is required'),
  body('phoneNumber').optional(),
  body('facebookUrl').optional().isURL().withMessage('Invalid URL for Facebook'),
  body('instagramUrl').optional().isURL().withMessage('Invalid URL for Instagram'),
  body('youtubeUrl').optional().isURL().withMessage('Invalid URL for YouTube'),
  body('linkedInUrl').optional().isURL().withMessage('Invalid URL for LinkedIn'),
  body('isActive').optional().isBoolean().withMessage('Status must be a boolean'),
  body('steps.*').optional().isString().withMessage('Each step must be a string'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
];

const bannerValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').notEmpty().trim().withMessage('Description is required'),
  body('isActive').optional().isBoolean().withMessage('Status must be a boolean'),
  validateImageFile('imageUrl', validImageExtensions),
];

const teamValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('position').notEmpty().trim().withMessage('Position is required'),
  validateImageFile('imageUrl', validImageExtensions),
];

const commentValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('message').notEmpty().trim().withMessage('Message is required'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
];
module.exports = { 
  userValidationRules,
  roleValidationRules,
  claimValidationRules,
  categoryValidationRules,
  addressValidationRules,
  projectValidationRules,
  aboutUsValidationRules,
  bannerValidationRules,
  teamValidationRules,
  commentValidationRules
};
