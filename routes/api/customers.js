const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/fabricMasterController/customerController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require("../../middleware/verifyRoles");
//const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .get(customerController.getAllCustomer)
    .post(//verifyRoles(rolesList.Admin, rolesList.Editor), 
    customerController.createNewCustomer)
    .put(//verifyRoles(rolesList.Admin, rolesList.Editor),
    customerController.updateCustomer)
    .delete(//verifyRoles(rolesList.Admin),
    customerController.deleteCustomer);

router.route('/:id')
    .get(customerController.getCustomer)

module.exports = router;