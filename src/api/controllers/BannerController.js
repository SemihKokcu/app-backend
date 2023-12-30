const bannerService = require('../../services/BannerService');

const bannerController = {
  addBanner: async (req, res, next) => {
    try {
      const savedBanner = await bannerService.addBanner(req);
      res.status(201).json(savedBanner);
    } catch (error) {
      next(error);
    }
  },

  updateBanner: async (req, res, next) => {
    try {
      const { bannerId } = req.params;
      const updatedBanner = await bannerService.update(bannerId, req);
      res.json(updatedBanner);
    } catch (error) {
      next(error);
    }
  },

  deleteBanner: async (req, res, next) => {
    try {
      const { bannerId } = req.params;
      const result = await bannerService.deleteBanner(bannerId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getBanner: async (req, res, next) => {
    try {
      const { bannerId } = req.params;
      const banner = await bannerService.getBanner(bannerId);
      res.json(banner);
    } catch (error) {
      next(error);
    }
  },

  getAllBanners: async (req, res, next) => {
    try {
      const banners = await bannerService.getAllBanners();
      res.json(banners);
    } catch (error) {
      next(error);
    }
  },
  getAllPaginatedBanners: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await bannerService.getAllPaginatedBanners(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bannerController;
