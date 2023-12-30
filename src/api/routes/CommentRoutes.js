const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentsController');
const { authMiddleware } = require('../../middleware/AuthMiddleware');
const { create_comment, update_comment, delete_comment } = require('./claims/ClaimsNames');
const { commentValidationRules } = require('./validators/validationRules');
const validate = require('../../middleware/ValidatorMiddleWare');

router.post('/add', authMiddleware([`${create_comment}`]), commentValidationRules, validate, commentController.addComment);
router.put('/update/:commentId', authMiddleware([`${update_comment}`]), commentValidationRules, validate, commentController.updateComment);
router.delete('/delete/:commentId', authMiddleware([`${delete_comment}`]), commentController.deleteComment);
router.get('/get/:commentId', commentController.getComment);
router.get('/getAll', commentController.getAll);
router.get('/getAll', commentController.getAllPaginated);

module.exports = router;
