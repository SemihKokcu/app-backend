const Role = require('../models/Role');

const RoleService = {
  addRole: async (data) => {
    try {
      const { name, descp, claims } = data;

      const newRole = new Role({
        name,
        descp,
        claims,
      });

      const savedRole = await newRole.save();
      return savedRole;
    } catch (error) {
      throw error;
    }
  },

  updateRole: async (roleId, data) => {
    try {
      const { name, descp, claims } = data;

      const updatedRole = await Role.findByIdAndUpdate(
        roleId,
        { name, descp, claims },
        { new: true }
      );

      if (!updatedRole) {
        throw new Error('Role not found');
      }

      return updatedRole;
    } catch (error) {
      throw error;
    }
  },

  deleteRole: async (roleId) => {
    try {
      const deletedRole = await Role.findByIdAndDelete(roleId);

      if (!deletedRole) {
        throw new Error('Role not found');
      }

      return { message: 'Role deleted successfully' };
    } catch (error) {
      throw error;
    }
  },

  getRole: async (roleId) => {
    try {
      const role = await Role.findById(roleId).populate('claims');

      if (!role) {
        throw new Error('Role not found');
      }

      return role;
    } catch (error) {
      throw error;
    }
  },

  getAllRoles: async () => {
    try {
      const roles = await Role.find().populate('claims');
      return roles;
    } catch (error) {
      throw error;
    }
  },

  getAllPaginatedRoles: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;

      const [roles, totalCount] = await Promise.all([
        Role.find().limit(parseInt(limit)).skip(startIndex).populate('claims'),
        Role.countDocuments(),
      ]);

      const results = {
        roles,
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

module.exports = RoleService;
