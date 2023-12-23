const Claim = require('../models/Claim');

const ClaimService = {
  addClaim: async (data) => {
    try {
      const { name, descp } = data;

      const newClaim = new Claim({
        name,
        descp,
      });

      const savedClaim = await newClaim.save();
      return savedClaim;
    } catch (error) {
      throw error;
    }
  },

  updateClaim: async (claimId, data) => {
    try {
      const { name, descp } = data;

      const updatedClaim = await Claim.findByIdAndUpdate(
        claimId,
        { name, descp },
        { new: true }
      );

      if (!updatedClaim) {
        throw new Error('Claim not found');
      }

      return updatedClaim;
    } catch (error) {
      throw error;
    }
  },

  deleteClaim: async (claimId) => {
    try {
      const deletedClaim = await Claim.findByIdAndDelete(claimId);

      if (!deletedClaim) {
        throw new Error('Claim not found');
      }

      return { message: 'Claim deleted successfully' };
    } catch (error) {
      throw error;
    }
  },

  getClaim: async (claimId) => {
    try {
      const claim = await Claim.findById(claimId);

      if (!claim) {
        throw new Error('Claim not found');
      }

      return claim;
    } catch (error) {
      throw error;
    }
  },

  getAllClaims: async () => {
    try {
      const claims = await Claim.find();
      return claims;
    } catch (error) {
      throw error;
    }
  },

  getAllPaginatedClaims: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;

      const [claims, totalCount] = await Promise.all([
        Claim.find().limit(parseInt(limit)).skip(startIndex),
        Claim.countDocuments(),
      ]);

      const results = {
        claims,
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

module.exports = ClaimService;
