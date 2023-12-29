const Address = require('../models/Address');

const addressService = {
  addAddress: async (data) => {
    try {
      const { userId, buildingNumber, doorNumber, address, city, country, postalCode } = data;

      const newAddress = new Address({
        userId,
        buildingNumber,
        doorNumber,
        address,
        city,
        country,
        postalCode,
      });

      const savedAddress = await newAddress.save();
      return savedAddress;
    } catch (error) {
      throw error;
    }
  },

  updateAddress: async (addressId, data) => {
    try {
      const { buildingNumber, doorNumber, address, city, country, postalCode } = data;

      const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        { buildingNumber, doorNumber, address, city, country, postalCode },
        { new: true }
      );

      if (!updatedAddress) {
        throw { message: 'Address not found' };
      }

      return updatedAddress;
    } catch (error) {
      throw error;
    }
  },


  deleteAddress: async (addressId) => {
    try {
      const deletedAddress = await Address.findByIdAndDelete(addressId);

      if (!deletedAddress) {
        throw { message: 'Address not found' };
      }

      return { message: 'Address deleted successfully' };
    } catch (error) {
      throw error;
    }
  },

  getAddress: async (addressId) => {
    try {
      const address = await Address.findById(addressId);

      if (!address) {
        throw { message: 'Address not found' };
      }

      return address;
    } catch (error) {
      throw error;
    }
  },

  getAllAddresses: async () => {
    try {
      const addresses = await Address.find();
      return addresses;
    } catch (error) {
      throw error;
    }
  },

  getAllPaginatedAddresses: async (page = 1, limit = 10) => {
    try {
      const startIndex = (page - 1) * limit;

      const [addresses, totalCount] = await Promise.all([
        Address.find().limit(parseInt(limit)).skip(startIndex),
        Address.countDocuments(),
      ]);

      const results = {
        addresses,
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

module.exports = addressService;
