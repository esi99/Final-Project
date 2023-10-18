const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 

router.post('/register', authController.registerAdmin);

router.post('/login', authController.loginAdmin);

router.post('/logout', authController.logoutAdmin);

router.get('/redirect-to-blog', async (req, res) => {

    res.redirect('/blog-posts');
  });

module.exports = router;
