const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Import the admin controller

// Route to get a list of all admins
router.get('/', adminController.admin_index);
router.post('/', adminController.loginAdmin);
// Route to create a new 
router.post('/', adminController.admin_create);

router.get('/:id',adminController.admin_details)
// Route to update an  account
router.put('/:id', adminController.admin_update);

// Route to delete an  account
router.delete('/:id', adminController.admin_delete);

module.exports = router;
