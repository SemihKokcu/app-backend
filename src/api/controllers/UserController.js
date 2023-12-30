const userService = require('../../services/UserService');

const userController = {
  add: async (req, res,next) => {
    try {
      const newUser = await userService.add(req);
      res.status(201).json(newUser);
    } catch (error) {
      next(error)
    }
  },

  update: async (req, res,next) => {
    try {
      const userId = req.params.id;
      const updatedUser = await userService.update(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error)
    }
  },

  delete: async (req, res,next) => {
    try {
      const userId = req.params.id;
      const deletedUser = await userService.delete(userId);
      res.json(deletedUser);
    } catch (error) {
      next(error)
    }
  },

  get: async (req, res,next) => {
    try {
      const userId = req.params.id;
      const user = await userService.get(userId);
      res.json(user);
    } catch (error) {
      next(error)
    }
  },

  getAll: async (req, res,next) => {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error) {
      next(error)
    }
  },

  getAllPaginated: async (req, res,next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await userService.getAllPaginated(page, limit);
      res.json(results);
    } catch (error) {
      next(error)
    }
  },
};

module.exports = userController;
