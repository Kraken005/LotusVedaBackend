const express = require('express');
const multer = require('multer')
const router = express.Router();
const sampleController = require('../../../controllers/fabricMasterController/constants/sampleController');
const sample = require('../../../models/constants/sample');
// const rolesList = require('../../config/rolesList');
// const verifyRoles = require('../../middleware/verifyRoles');
//const upload = require('../../../server');

const storage = multer.memoryStorage(); // Store files in memory (you can change this as needed)
const upload = multer({ storage: storage });

router.route('/')
    .get(sampleController.getAllSample)
    .post(upload.single('picture'), sampleController.createNewSample)
    .put(sampleController.updateSample)
    .delete(sampleController.deleteSample)

router.route('/:id')
    .get(sampleController.getSample)

module.exports = router;