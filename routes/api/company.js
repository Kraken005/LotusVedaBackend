const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/fabricMasterController/companyController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(companyController.getAllCompany)
    .post(companyController.createNewCompany)
    .put(companyController.updateCompany)
    .delete(companyController.deleteCompany)


router.route('/:id')
    .get(companyController.getCompany)

module.exports = router;