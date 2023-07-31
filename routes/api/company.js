const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/fabricMasterController/companyController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(companyController.getAllCompany)
    .post(companyController.createNewCompany)
    .put(companyController.updateCompany)

module.exports = router;