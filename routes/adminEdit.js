const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminEditController'); 

router.get('/:id',adminController.admin_edit)


module.exports = router;