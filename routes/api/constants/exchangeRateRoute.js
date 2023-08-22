const express = require('express');
const router = express.Router();
const exchangeRateController = require('../../../controllers/fabricMasterController/constants/exchangeRateController');
const exchangeRate = require('../../../models/constants/exchangeRate');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(exchangeRateController.getAllExchangeRate)
    .post(exchangeRateController.createNewExchangeRate)
    .put(exchangeRateController.updateExchangeRate)
    .delete(exchangeRateController.deleteExchangeRate)

router.route('/:id')
    .get(exchangeRateController.getExchangeRate)

module.exports = router;