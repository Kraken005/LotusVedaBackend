const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeesController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require("../../middleware/verifyRoles");
//const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(verifyRoles(rolesList.Admin, rolesList.Editor), employeeController.createNewEmployee)
    .put(verifyRoles(rolesList.Admin, rolesList.Editor),employeeController.updateEmployee)
    .delete(verifyRoles(rolesList.Admin),employeeController.deleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee)

module.exports = router;