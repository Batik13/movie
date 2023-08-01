// controllers/userController.js
const User = require("../models/User");

exports.registerNewUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.render("register", { error: err });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !user.isValidPassword(password)) {
    // Если пользователя не существует или пароль неверный, отправьте ошибку
    res.status(401).send("Invalid username or password");
  } else {
    // Если все в порядке, сохраните пользователя (и его роль) в сессии и перенаправьте его на главную страницу
    req.session.user = { username: user.username, role: user.role };
    res.redirect("/");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      // handle error
    } else {
      res.redirect("/login");
    }
  });
};
