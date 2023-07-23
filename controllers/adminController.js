exports.protectAdminRoute = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

exports.showAdminDashboard = (req, res) => {
  res.render('admin/adminDashboard');
};
