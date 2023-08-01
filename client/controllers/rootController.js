// movie2/controllers/rootController.js

var rootController = {
  index: function (req, res, next) {
    res.render("index", { user: req.session.user });
  },
};

module.exports = rootController;
