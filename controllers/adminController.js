
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const Joi = require('joi');


const adminSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});
const loginAdmin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  const validationResult = adminSchema.validate({ usernameOrEmail, password });

  try {
    // Try to find the admin by username or email
    const admin = await Admin.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Declare the passwordMatch variable before the if statement
    let passwordMatch;

    // Compare the password
    passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Set up the session for the logged-in admin
    req.session.adminId = admin._id;

    // Redirect to a dashboard or profile page after login
    res.redirect('/admin'); // Replace '/dashboard' with the actual URL
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const admin_index = async (req, res) => {
  const admins = await Admin.find().sort({ createdAt: -1 });

  res.render('admin/index', { admins, title: 'All admins' });
};

const admin_create = async (req, res) => {
  const { username, password , email } = req.body;

  const validationResult = adminSchema.validate({ username, password ,email });

  if (validationResult.error) {
    throw new Error('Invalid admin data: your user name  or password is low');
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = new Admin({ username, 
      password: hashedPassword , email });
    await admin.save();

    res.redirect('/admin');
  }
};

const admin_details = async (req, res) => {
  const id = req.params.id;

  const admin = await Admin.findById(id);

  res.render('admin/adminDet', { admin, title: 'Admin Details' });
};

const admin_update = async (req, res) => {
  const id = req.params.id;
  const { username, password , email } = req.body;

  const admin = await Admin.findById(id);

  if (!admin) {
    return res.status(404).send('Admin not found');
  }

  const adminWithSameUsername = await Admin.findOne({ username });
  if (adminWithSameUsername && adminWithSameUsername._id != id) {
    return res.status(409).send('Username is already taken');
  }

  const validationResult = adminSchema.validate({ username, password , email });

  if (validationResult.error) {
    // Throw an error
  } else {
    admin.username = username;
    admin.password = password;
    admin.email = email;
    await admin.save();

    res.redirect('/admin');
  }
};

const admin_delete = async (req, res) => {
  const id = req.params.id;

  try {
    await Admin.findByIdAndDelete(id);
    res.json({ redirect: '/admin' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  loginAdmin,
  admin_index,
  admin_create,
  admin_details,
  admin_update,
  admin_delete,
};
