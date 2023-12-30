const commentService = require('../../services/CommentService');

const CommentController = {
  addComment: async (req, res, next) => {
    try {
      const data = req.body;
      const savedComment = await commentService.addComment(data);
      res.status(201).json(savedComment);
    } catch (error) {
      next(error);
    }
  },

  updateComment: async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const data = req.body;
      const updatedComment = await commentService.updateComment(commentId, data);
      res.json(updatedComment);
    } catch (error) {
      next(error);
    }
  },

  deleteComment: async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const result = await commentService.deleteComment(commentId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getComment: async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const Comment = await commentService.getComment(commentId);
      res.json(Comment);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const commentList = await commentService.getAllComment();
      res.json(commentList);
    } catch (error) {
      next(error);
    }
  },
  getAllPaginated: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await commentService.getAllPaginatedComment(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = CommentController;
