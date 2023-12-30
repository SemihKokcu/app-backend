const Banner = require('../models/Banner');
const deleteImage = require("../utils/imageCleaner");

const bannerService = {
  addBanner: async (req) => {
    try {
        const imageUrl = req.file.filename;

      const newBanner = new Banner({
       imageUrl: imageUrl,
       ...req.body
      });

      const savedBanner = await newBanner.save();
      return savedBanner;
    } catch (error) {
      throw error;
    }
  },

  update: async (bannerId, req) => {
    try {
      const banner = await Banner.findById(bannerId);
      if (!banner) {
        throw new Error('banner not found');
      }

      const newImageUrl = req.file?.filename;
      if (newImageUrl) {
        deleteImage(banner.imageUrl);
        banner.imageUrl = newImageUrl;
      }

      banner.name = req.body.name;
      banner.description = req.body.description;
      banner.isActive = req.body.isActive;
      

      const updatedbanner = await banner.save();
      return updatedbanner;
    } catch (error) {
      throw error;
    }
  },

  deleteBanner: async (bannerId) => {
    try {
      const deletedBanner = await Banner.findByIdAndDelete(bannerId);

      if (!deletedBanner) {
        throw { message: 'Banner not found' };
      }

      return { message: 'Banner deleted successfully' };
    } catch (error) {
      throw error;
    }
  },

  getBanner: async (bannerId) => {
    try {
      const banner = await Banner.findById(bannerId);

      if (!banner) {
        throw { message: 'Banner not found' };
      }

      return banner;
    } catch (error) {
      throw error;
    }
  },

  getAllBanners: async () => {
    try {
      const banners = await Banner.find();
      return banners;
    } catch (error) {
      throw error;
    }
  },
  getAllPaginatedBanners: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;

      const [banners, totalCount] = await Promise.all([
        Banner.find().limit(parseInt(limit)).skip(startIndex),
        Banner.countDocuments(),
      ]);

      const results = {
        banners,
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

module.exports = bannerService;
