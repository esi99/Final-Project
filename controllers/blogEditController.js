const Blog = require('../models/blogPost');
const blog_edit = async (req, res) => {
    const id = req.params.id;
  
    try {
      const blogg = await Blog.findById(id);
      res.render('blog/edit', { blogg, title: 'Edit' });
    } catch (err) {
      
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };



  module.exports = {
   
    blog_edit,
  };