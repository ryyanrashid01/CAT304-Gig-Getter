const pool = require("../db");
const { escape } = require("mysql2");
const bcrypt = require("bcrypt");

const admin_register_get = (req, res) => {
  if (req.session.admin_id) {
    res.render("admin-register", { type: null, message: null });
  } else {
    res.redirect("/admin-login");
  }
  //   res.render("admin-register", { type: null, message: null });
};

const admin_register_post = async (req, res) => {
  var { username, password } = req.body;
  if (!username || !password) {
    res.render("admin-register", {
      type: "error",
      message: "Username and password are required",
    });
  }
  var query = "SELECT * FROM Admin WHERE admin_Uname = " + escape(username);
  pool
    .query(query)
    .then(async (result) => {
      result = result[0];
      console.log(result);
      if (result[0]) {
        res.render("admin-register", {
          type: "error",
          message: "Username already exists!",
        });
      } else {
        const passHash = await bcrypt.hash(password, 5);
        pool
          .query(
            "INSERT INTO Admin (admin_Uname, admin_Password, admin_Regby) VALUES (?,?,?)",
            [username, passHash, req.session.admin_id]
          )
          .then((result) => {
            res.render("admin-register", {
              type: "success",
              message: "Admin " + username + " Registration Successful!",
            });
          })
          .catch((err) => {
            console.log(err);
            res.render("admin-register", {
              type: "error",
              message: "Internal Server Error! Please try again later.",
            });
          });
      }
    })
    .catch((err) => {
      res.render("admin-register", {
        type: "error",
        message: "Internal Server Error! Please try again later.",
      });
    });
};

module.exports = { admin_register_get, admin_register_post };
