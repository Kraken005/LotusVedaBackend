const express = require('express');
const router = express.Router();
const dealerController = require('../../../controllers/fabricMasterController/constants/dealerController');
const dealer = require('../../../models/constants/dealer');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(dealerController.getAllDealer)
    .post(dealerController.createNewDealer)
    .put(dealerController.updateDealer)
    .delete(dealerController.deleteDealer)

router.route('/:id')
    .get(dealerController.getDealer)

module.exports = router;