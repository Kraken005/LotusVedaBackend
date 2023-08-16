const express = require('express');
const router = express.Router();
const categoryController = require('../../../controllers/fabricMasterController/constants/categoryController');
const category = require('../../../models/constants/category');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(categoryController.getAllCategory)
    .post(categoryController.createNewCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)

router.route('/:id')
    .get(categoryController.getCategory)

module.exports = router;