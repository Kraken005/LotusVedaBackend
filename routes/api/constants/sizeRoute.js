const express = require('express');
const router = express.Router();
const sizeController = require('../../../controllers/fabricMasterController/constants/sizeController');
const size = require('../../../models/constants/size');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(sizeController.getAllSize)
    .post(sizeController.createNewSize)
    .put(sizeController.updateSize)
    .delete(sizeController.deleteSize)

router.route('/:id')
    .get(sizeController.getSize)

module.exports = router;