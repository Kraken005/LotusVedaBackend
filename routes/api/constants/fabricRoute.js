const express = require('express');
const router = express.Router();
const fabricController = require('../../../controllers/fabricMasterController/constants/fabricController');
const size = require('../../../models/constants/fabric');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(fabricController.getAllFabric)
    .post(fabricController.createNewFabric)
    .put(fabricController.updateFabric)
    .delete(fabricController.deleteFabric)

router.route('/:id')
    .get(fabricController.getFabric)

module.exports = router;