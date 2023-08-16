const express = require('express');
const router = express.Router();
const colorController = require('../../../controllers/fabricMasterController/constants/colorController');
const color = require('../../../models/constants/color');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(colorController.getAllColor)
    .post(colorController.createNewColor)
    .put(colorController.updateColor)
    .delete(colorController.deleteColor)

router.route('/:id')
    .get(colorController.getColor)

module.exports = router;