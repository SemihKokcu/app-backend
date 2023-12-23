const claimService = require('../../services/ClaimService');

const ClaimController = {
  addClaim: async (req, res, next) => {
    try {
      const newClaim = await claimService.addClaim(req.body);
      res.status(201).json(newClaim);
    } catch (error) {
      next(error);
    }
  },

  updateClaim: async (req, res, next) => {
    try {
      const { claimId } = req.params;
      const updatedClaim = await claimService.updateClaim(claimId, req.body);
      res.json(updatedClaim);
    } catch (error) {
      next(error);
    }
  },

  deleteClaim: async (req, res, next) => {
    try {
      const { claimId } = req.params;
      const result = await claimService.deleteClaim(claimId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getClaim: async (req, res, next) => {
    try {
      const { claimId } = req.params;
      const claim = await claimService.getClaim(claimId);
      res.json(claim);
    } catch (error) {
      next(error);
    }
  },

  getAllClaims: async (req, res, next) => {
    try {
      const claims = await claimService.getAllClaims();
      res.json(claims);
    } catch (error) {
      next(error);
    }
  },

  getAllPaginatedClaims: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await claimService.getAllPaginatedClaims(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ClaimController;
