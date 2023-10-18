const express = require('express');
const blogController = require('../controllers/blogPostController');

const router = express.Router();
exports.router = router;
router.get('/', blogController.blog_index);
router.get('/create', blogController.blog_create_get);

router.post('/', blogController.blog_create_post);


router.get('/:id', blogController.blog_details);
router.post('/:id', blogController.blog_update );

router.delete('/:id', blogController.blog_delete);

module.exports = router;