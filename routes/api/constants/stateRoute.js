const express = require('express');
const router = express.Router();
const stateController = require('../../../controllers/fabricMasterController/constants/stateController')
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(stateController.getAllState)
    .post(stateController.createNewState)
    .put(stateController.updateState)
    .delete(stateController.deleteState)

router.route('/:id')
    .get(stateController.getState)

module.exports = router;