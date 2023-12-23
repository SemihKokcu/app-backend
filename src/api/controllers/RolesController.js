const roleService = require('../../services/RoleService');

const RoleController = {
  addRole: async (req, res, next) => {
    try {
      const newRole = await roleService.addRole(req.body);
      res.status(201).json(newRole);
    } catch (error) {
      next(error);
    }
  },

  updateRole: async (req, res, next) => {
    try {
      const { roleId } = req.params;
      const updatedRole = await roleService.updateRole(roleId, req.body);
      res.json(updatedRole);
    } catch (error) {
      next(error);
    }
  },

  deleteRole: async (req, res, next) => {
    try {
      const { roleId } = req.params;
      const result = await roleService.deleteRole(roleId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  getRole: async (req, res, next) => {
    try {
      const { roleId } = req.params;
      const role = await roleService.getRole(roleId);
      res.json(role);
    } catch (error) {
      next(error);
    }
  },

  getAllRoles: async (req, res, next) => {
    try {
      const roles = await roleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  },

  getAllPaginatedRoles: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await roleService.getAllPaginatedRoles(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = RoleController;
