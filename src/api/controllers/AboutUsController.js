const aboutUsService = require('../../services/AboutUsService');

const aboutUsController = {
  addAboutUs: async (req, res, next) => {
    try {
      const data = req.body;
      const savedAboutUs = await aboutUsService.addAboutUs(data);
      res.status(201).json(savedAboutUs);
    } catch (error) {
      next(error);
    }
  },

  updateAboutUs: async (req, res, next) => {
    try {
      const { aboutUsId } = req.params;
      const data = req.body;
      const updatedAboutUs = await aboutUsService.updateAboutUs(aboutUsId, data);
      res.json(updatedAboutUs);
    } catch (error) {
      next(error);
    }
  },

  deleteAboutUs: async (req, res, next) => {
    try {
      const { aboutUsId } = req.params;
      const result = await aboutUsService.deleteAboutUs(aboutUsId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getAboutUs: async (req, res, next) => {
    try {
      const { aboutUsId } = req.params;
      const aboutUs = await aboutUsService.getAboutUs(aboutUsId);
      res.json(aboutUs);
    } catch (error) {
      next(error);
    }
  },

  getAllAboutUs: async (req, res, next) => {
    try {
      const aboutUsList = await aboutUsService.getAllAboutUs();
      res.json(aboutUsList);
    } catch (error) {
      next(error);
    }
  },
  getAllPaginatedAboutUs: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await aboutUsService.getAllPaginatedAboutUs(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = aboutUsController;
