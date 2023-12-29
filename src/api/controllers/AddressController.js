const addressService = require('../../services/AddressService');

const addressController = {
  addAddress: async (req, res, next) => {
    try {
      const data = req.body;
      const savedAddress = await addressService.addAddress(data);
      res.status(201).json(savedAddress);
    } catch (error) {
      next(error);
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const data = req.body;
      const updatedAddress = await addressService.updateAddress(addressId, data);
      res.json(updatedAddress);
    } catch (error) {
      next(error);
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const result = await addressService.deleteAddress(addressId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getAddress: async (req, res, next) => {
    try {
      const { addressId } = req.params;
      const address = await addressService.getAddress(addressId);
      res.json(address);
    } catch (error) {
      next(error);
    }
  },

  getAllAddresses: async (req, res, next) => {
    try {
      const addresses = await addressService.getAllAddresses();
      res.json(addresses);
    } catch (error) {
      next(error);
    }
  },

  getAllPaginatedAddresses: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await addressService.getAllPaginatedAddresses(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = addressController;
