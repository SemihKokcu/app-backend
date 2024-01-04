const User = require('../models/User');
const Role = require('../models/Role');
const deleteImage = require("../utils/imageCleaner");

const UserService = {
  add: async (req) => {
    try {
      const imageUrl = req.file.filename;
      const newUser = new User({ profileImage: imageUrl, ...req.body });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  update: async (userId, data,file) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const newImageUrl = file?.filename;
      if (newImageUrl) {
        deleteImage(user.profileImage);
        user.profileImage = newImageUrl;
      }

      user.name = data.name;
      user.surname = data.surname;
      user.twoFactor = data.twoFactor;
      user.phoneNumber = data.phoneNumber;
      user.phoneVerified = data.phoneVerified;
      user.emailVerified = data.emailVerified;
      user.roles = data.roles;
      user.address = data.address;

      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  delete: async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        throw new Error('User not found');
      }
      deleteImage(deletedUser.profileImage)
      return deletedUser;
    } catch (error) {
      throw error;
    }
  },

  get: async (userId) => {
    try {
      const user = await User.findById(userId).populate({ path: 'roles', model: Role });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      const users = await User.find().populate({ path: 'roles', model: Role });
      return users;
    } catch (error) {
      throw error;
    }
  },

  getAllPaginated: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const [users, totalCount,emailVerifiedCount,phoneVerifiedCount,twoFactorCount] = await Promise.all([
        User.find().limit(parseInt(limit)).skip(startIndex).populate({ path: 'roles', model: Role }),
        User.countDocuments(),
        User.countDocuments({emailVerified : true}),
        User.countDocuments({phoneVerified : true}),
        User.countDocuments({twoFactor : true}),
      ]);

      const results = {
        users,
        pagination: {
          totalCount,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
          emailVerifiedCount,
          phoneVerifiedCount,
          twoFactorCount,
        },
      };
      return results;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserService;
