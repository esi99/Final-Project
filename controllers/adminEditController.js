const Admin = require('../models/admin');

const admin_edit = async (req, res) => {
    const id = req.params.id;
    const admin = await Admin.findById(id);
  
    if (!admin) {
      return res.status(404).send('Admin not found');
    }
  
    res.render('admin/adminEdit', { admin });
  };

  module.exports = {
    admin_edit,
  };
  