const checkUserRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.session.user || !allowedRoles.includes(req.session.user.role)) {
      return res.redirect("/login");
    }
    next();
  };
};

exports.protectRoute = checkUserRole(["admin", "customer"]);

exports.protectAdminRoute = checkUserRole(["admin"]);

exports.showAdminDashboard = (req, res) => {
  res.render("admin/adminDashboard");
};
