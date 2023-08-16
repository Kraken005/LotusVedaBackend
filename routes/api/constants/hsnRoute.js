const express = require('express');
const router = express.Router();
const hsnController = require('../../../controllers/fabricMasterController/constants/hsnController');
const hsn = require('../../../models/constants/hsn');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(hsnController.getAllHsn)
    .post(hsnController.createNewHsn)
    .put(hsnController.updateHsn)
    .delete(hsnController.deleteHsn)

router.route('/:id')
    .get(hsnController.getHsn)

module.exports = router;