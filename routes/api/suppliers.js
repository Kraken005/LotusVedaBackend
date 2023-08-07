const express = require('express');
const router = express.Router();
const supplierController = require('../../controllers/fabricMasterController/supplierController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(supplierController.getAllSupplier)
    .post(supplierController.createNewSupplier)
    .put(supplierController.updateSupplier)
    .delete(supplierController.deleteSupplier)


router.route('/:id')
    .get(supplierController.getSupplier)

module.exports = router;