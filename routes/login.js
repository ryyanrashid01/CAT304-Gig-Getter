const session = require("express-session");
const pool = require("../db");
const bcrypt = require("bcrypt");
const moment = require("moment");

const login_get = (req, res) => {
  if (req.session.user_id) {
    res.redirect("/");
    return;
  }
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
  query =
    "SELECT * FROM Users JOIN Location ON Users.location_id=Location.location_id WHERE email = '" +
    email +
    "'";
  pool
    .query(query)
    .then(async (result) => {
      result = result[0];
      if (result.length == 1) {
        var match = await bcrypt.compare(password, result[0].prof_pass);
        if (!match) {
          res.render("login", { type: "error", message: "Password incorrect" });
        } else {
          req.session.user_id = result[0].user_id;
          req.session.fName = result[0].fName;
          req.session.lName = result[0].lName;
          req.session.email = result[0].email;
          req.session.dob = moment(result[0].dob).format("MMM DD, YYYY");
          req.session.location = result[0].location_id;
          res.redirect("/");
        }
      } else {
        res.render("login", { type: "error", message: "Email not registered" });
      }
    })
    .catch((err) => {
      res.render("login", { type: "error", message: "Internal server error" });
    });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = { login_get, login_post, logout };
