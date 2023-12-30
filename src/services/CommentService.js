const Comment = require('../models/Comment');

const CommentService = {
  addComment: async (data) => {
    try {
      const newComment = new Comment(data);
      const savedComment = await newComment.save();
      return savedComment;
    } catch (error) {
      throw error;
    }
  },

  updateComment: async (commentId, data) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        data,
        { new: true }
      );

      if (!updatedComment) {
        throw { message: 'Comment not found' };
      }

      return updatedComment;
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (commentId) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
        throw { message: 'Comment not found' };
      }

      return { message: 'Comment deleted successfully' };
    } catch (error) {
      throw error;
    }
  },

  getComment: async (commentId) => {
    try {
      const comment = await Comment.findById(commentId);

      if (!comment) {
        throw { message: 'Comment not found' };
      }

      return comment;
    } catch (error) {
      throw error;
    }
  },

  getAllComment: async () => {
    try {
      const commentList = await Comment.find();
      return commentList;
    } catch (error) {
      throw error;
    }
  },
  getAllPaginatedComment: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;

      const [commentList, totalCount] = await Promise.all([
        Comment.find().limit(parseInt(limit)).skip(startIndex),
        Comment.countDocuments(),
      ]);

      const results = {
        commentList,
        pagination: {
          totalCount,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
        },
      };

      return results;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = CommentService;
