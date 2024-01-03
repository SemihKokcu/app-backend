const express = require('express');
const router = express.Router();
const multer = require('multer');
const { fileFilter, fileStorage } = require('../../utils/multer/imageSettings');
const projectController = require('../controllers/ProjectController');
const { authMiddleware } = require('../../middleware/AuthMiddleware');
const { create_project, update_project, delete_project } = require('./claims/ClaimsNames');
const {projectValidationRules}  = require('./validators/validationRules');
const validate = require('../../middleware/ValidatorMiddleWare');

router.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('images'));

router.post(
  '/add',
  // authMiddleware([`${create_project}`]), 
  projectValidationRules,
  validate,
  projectController.createProject
);

router.put(
  '/update/:projectId',
  // authMiddleware([`${update_project}`]),
  projectValidationRules,
  validate,
  projectController.updateProject
);

router.delete(
  '/delete/:projectId',
  // authMiddleware([`${delete_project}`]),
  projectController.deleteProject
);

router.get('/getAll', projectController.getAllProjects);
router.get('/get/:projectId', projectController.getProject);
router.get('/getAllPaginated', projectController.getAllPaginatedProjects);

module.exports = router;
