const express = require('express');
const router = express.Router();
const taxController = require('../../../controllers/fabricMasterController/constants/taxController');
const tax = require('../../../models/constants/tax');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(taxController.getAllTax)
    .post(taxController.createNewTax)
    .put(taxController.updateTax)
    .delete(taxController.deleteTax)

router.route('/:id')
    .get(taxController.getTax)

module.exports = router;