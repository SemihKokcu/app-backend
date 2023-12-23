const express = require('express');
const router = express.Router();
const RoleController = require('../api//controllers/RolesController');

router.post('/add', RoleController.addRole);

router.put('/update/:roleId', RoleController.updateRole);

router.delete('/delete/:roleId', RoleController.deleteRole);

router.get('/get/:roleId', RoleController.getRole);

router.get('/getAll', RoleController.getAllRoles);

router.get('/getAllPaginated/paginated', RoleController.getAllPaginatedRoles);

module.exports = router;
