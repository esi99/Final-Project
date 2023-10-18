const Admin = require('../models/admin'); 
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const adminSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

const authController = {
 
  registerAdmin: async (req, res) => {
    const { username, password, email } = req.body;

    const validationResult = adminSchema.validate({ username, password , email});

    try {
      if (validationResult.error) {
        throw new Error('Invalid admin data: your user name  or password is low');
      }

     
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      
      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({ username, password: hashedPassword , email});
      await newAdmin.save();

      res.redirect('/blog-posts');
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  

  
  loginAdmin: async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    const validationResult = adminSchema.validate({ usernameOrEmail, password });

    try {
      
      const admin = await Admin.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
  
      if (!admin) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      let passwordMatch;
  
  
      passwordMatch = await bcrypt.compare(password, admin.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
     
      req.session.adminId = admin._id;
      res.redirect('/blog-posts'); 
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },

 
  logoutAdmin: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }

      res.status(200).json({ message: 'Logged out' });
    });
  },

};

module.exports = authController;
