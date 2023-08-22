const express = require('express');
const router = express.Router();
const unitController = require('../../../controllers/fabricMasterController/constants/unitController');
const unit = require('../../../models/constants/unit');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(unitController.getAllUnit)
    .post(unitController.createNewUnit)
    .put(unitController.updateUnit)
    .delete(unitController.deleteUnit)

router.route('/:id')
    .get(unitController.getUnit)

module.exports = router;