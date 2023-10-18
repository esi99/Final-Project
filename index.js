const express = require('express');
const mongoose = require('./config/database'); 
const expressSession = require('./config/session'); 

const ejs = require('ejs');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession);
app.set('view engine', 'ejs');


const adminRoutes = require('./routes/admin');
const adminEditRoutes = require('./routes/adminEdit');
 const authRoutes = require('./routes/auth');

const blogPostsRoutes = require('./routes/blogPosts');
const blogEditRoutes = require('./routes/blogEdit');

app.use('/admin', adminRoutes);
app.use('/admin/adminEdit', adminEditRoutes); 
 app.use('/auth', authRoutes);

app.use('/blog-posts', blogPostsRoutes);

app.use('/blog-posts/edit', blogEditRoutes);



app.get('/', (req,res) => {
  res.render('homePage');
});
app.get('/blog', (req, res) => {
  res.redirect('/blog-posts');
});
app.get('/index', (req, res) => {
  res.redirect('/blog-posts');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/auth/register', (req, res) => {
  res.render('auth/register');
});


app.get('/auth/login', (req, res) => {
  res.render('auth/login');
});
app.get('/auth/redirect-to-blog', (req, res) => {
  res.redirect('/blog-posts');
});




app.use((req, res) => {
  res.status(404).render('blog/404', { title: '404' });
});


app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
