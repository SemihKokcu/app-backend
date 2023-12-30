const AboutUs = require('../models/AboutUs');

const aboutUsService = {
  addAboutUs: async (data) => {
    try {
      const newAboutUs = new AboutUs(data);
      const savedAboutUs = await newAboutUs.save();
      return savedAboutUs;
    } catch (error) {
      throw error;
    }
  },

  updateAboutUs: async (aboutUsId, data) => {
    try {
      const updatedAboutUs = await AboutUs.findByIdAndUpdate(
        aboutUsId,
        data,
        { new: true }
      );

      if (!updatedAboutUs) {
        throw { message: 'AboutUs not found' };
      }

      return updatedAboutUs;
    } catch (error) {
      throw error;
    }
  },

  deleteAboutUs: async (aboutUsId) => {
    try {
      const deletedAboutUs = await AboutUs.findByIdAndDelete(aboutUsId);

      if (!deletedAboutUs) {
        throw { message: 'AboutUs not found' };
      }

      return { message: 'AboutUs deleted successfully' };
    } catch (error) {
      throw error;
    }
  },

  getAboutUs: async (aboutUsId) => {
    try {
      const aboutUs = await AboutUs.findById(aboutUsId);

      if (!aboutUs) {
        throw { message: 'AboutUs not found' };
      }

      return aboutUs;
    } catch (error) {
      throw error;
    }
  },

  getAllAboutUs: async () => {
    try {
      const aboutUsList = await AboutUs.find();
      return aboutUsList;
    } catch (error) {
      throw error;
    }
  },
  getAllPaginatedAboutUs: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;

      const [aboutUsList, totalCount] = await Promise.all([
        AboutUs.find().limit(parseInt(limit)).skip(startIndex),
        AboutUs.countDocuments(),
      ]);

      const results = {
        aboutUsList,
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

module.exports = aboutUsService;
