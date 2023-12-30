const express = require('express');
const router = express.Router();
const multer = require('multer');
const { fileFilter, fileStorage } = require('../../utils/multer/imageSettings');
const teamController = require('../controllers/TeamsController');
const {teamValidationRules}  = require('./validators/validationRules');
const {create_team,update_team,delete_team} = require('../routes/claims/ClaimsNames');
const { authMiddleware } = require('../../middleware/AuthMiddleware');
const validate = require('../../middleware/ValidatorMiddleWare');

router.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

router.post(
  '/add',
  authMiddleware([`${create_team}`]),
  teamValidationRules,
  validate,
  teamController.addTeam
);

router.put(
  '/update/:teamId',
  authMiddleware([`${update_team}`]),
  teamController.updateTeam
);

router.delete(
  '/delete/:teamId',
  authMiddleware([`${delete_team}`]),
  teamController.deleteTeam
);

router.get('/get/:teamId', teamController.getTeam);
router.get('/getAll', teamController.getAllTeams);
router.get('/getAllPaginated', teamController.getAllPaginatedTeams);

module.exports = router;
