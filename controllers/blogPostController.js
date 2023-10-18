const Blog = require('../models/blogPost');

const blog_index = async (req, res) => {
  try {
    const result = await Blog.find().sort({ createdAt: -1 });
    res.render('blog/index', { blogs: result, title: 'All blogs' });
  } catch (err) {
    console.log(err);
  }
};

const blog_details = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Blog.findById(id);
    res.render('blog/details', { blog: result, title: 'Blog Details' });
  } catch (err) {
    console.log(err);
  }
};

const blog_create_get = (req, res) => {
  res.render('blog/create', { title: 'Create a new blog' });
};

const blog_create_post = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.redirect('/blog-posts');
  } catch (err) {
    console.log(err);
  }
};

const blog_update = async (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).send('Blog post not found');
    }

    blog.title = title;
    blog.content = content;

    await blog.save();

    res.redirect('/blog-posts');
  } catch (err) {
    console.log(err);
  }
};



const blog_delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.json({ redirect: '/blog-posts' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_update,
  blog_delete,
};
