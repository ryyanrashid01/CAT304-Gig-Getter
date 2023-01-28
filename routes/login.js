const session = require("express-session");
const pool = require("../db");
const bcrypt = require("bcrypt");

const login_get = (req, res) => {
  res.render("login", { type: null, message: null });
};

const login_post = async (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.render("login", {
      type: "error",
      message: "Fields cannot be empty",
    });
  }
  query = "SELECT * FROM Users WHERE email = '" + email + "'";
  pool.query(query, async (err, result) => {
    if (err) {
      res.render("login", { type: "error", message: "Internal server error" });
    } else if (result.length == 1) {
      var match = await bcrypt.compare(password, result[0].prof_pass);
      if (!match) {
        res.render("login", { type: "error", message: "Password incorrect" });
      } else {
        req.session.user_id = result[0].user_id;
        req.session.fName = result[0].fName;
        req.session.lName = result[0].lName;
        res.redirect("gig_post");
      }
    } else {
      res.render("login", { type: "error", message: "Email not registered" });
    }
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = { login_get, login_post, logout };
