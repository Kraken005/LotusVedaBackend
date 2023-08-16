const express = require('express');
const router = express.Router();
const taxSlabController = require('../../../controllers/fabricMasterController/constants/taxSlabController');
const taxSlab = require('../../../models/constants/taxSlab');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(taxSlabController.getAllTaxSlab)
    .post(taxSlabController.createNewTaxSlab)
    .put(taxSlabController.updateTaxSlab)
    .delete(taxSlabController.deleteTaxSlab)

router.route('/:id')
    .get(taxSlabController.getTaxSlab)

module.exports = router;