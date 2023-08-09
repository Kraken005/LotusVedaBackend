const express = require('express');
const router = express.Router();
const cityController = require('../../../controllers/fabricMasterController/constants/cityController');
const city = require('../../../models/constants/city');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(cityController.getAllCity)
    .post(cityController.createNewCity)
    .put(cityController.updateCity)
    .delete(cityController.deleteCity)

router.route('/:id')
    .get(cityController.getCity)

module.exports = router;