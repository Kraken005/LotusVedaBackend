const express = require('express');
const router = express.Router();
const techniqueController = require('../../../controllers/fabricMasterController/constants/techniqueController');
const technique = require('../../../models/constants/technique');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(techniqueController.getAllTechnique)
    .post(techniqueController.createNewTechnique)
    .put(techniqueController.updateTechnique)
    .delete(techniqueController.deleteTechnique)

router.route('/:id')
    .get(techniqueController.getTechnique)

module.exports = router;