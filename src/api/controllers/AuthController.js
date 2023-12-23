const authService = require('../../services/AuthService');

const AuthController = {
  register: async (req, res, next) => {
    try {
      const { email, password, name, surname } = req.body;
      await authService.register(email, password, name, surname);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.json({ token, message: 'Login successful' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
