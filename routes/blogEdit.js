const express = require('express');
const blogController = require('../controllers/blogEditController');

const router = express.Router();
exports.router = router;

router.get('/:id', blogController.blog_edit);


module.exports = router;

