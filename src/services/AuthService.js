const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AuthService = {
  register: async (email, password, name, surname) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, name, surname, password: hashedPassword });
      await newUser.save();
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const user = await User.findOne({ email }).populate({
        path: 'roles',
        populate: {
          path: 'claims',
        },
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const claimNames = user.roles.reduce((acc, role) => {
        return acc.concat(role.claims.map(claim => claim.name));
      }, []);

      const tokenPayload = {
        userId: user._id,
        email: user.email,
        claims: claimNames,
      };

      const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN,
      });

      return token;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = AuthService;
