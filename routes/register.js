const moment = require("moment");
const { escape } = require("mysql");
const bcrypt = require("bcrypt");

const pool = require("../db");

const register_get = function (req, res) {
  res.render("register", { message: null });
};

const register_post = async (req, res) => {
  var { fName, lName, dob, email, password } = req.body;

  if (!fName || !lName || !dob || !email || !password) {
    res.render("register", {
      message: "Please fill all the fields",
    });
  }

  // Change format of date
  dob = moment(dob).format("YYYY-MM-DD");

  // Check if email already exists in database
  var query = "SELECT * FROM Users WHERE email = " + escape(email);

  pool.query(query, async (err, result) => {
    if (err) {
      console.log(err);
      res.render("register", {
        message: "Internal Server Error! Please try again later.",
      });
    }
    if (result[0]) {
      res.render("register", {
        message: "Email already in use. Sign in or use another email.",
      });
    } else {
      // Capitalise first letter of name
      fName = fName.charAt(0).toUpperCase() + fName.slice(1);
      lName = lName.charAt(0).toUpperCase() + lName.slice(1);
      const passHash = await bcrypt.hash(password, 5);
      pool.query(
        "INSERT INTO Users(fName, lName, dob, email, prof_pass) VALUES (?,?,?,?,?)",
        [fName, lName, dob, email, passHash],
        (err, success) => {
          if (err) {
            console.log(err);
            res.render("register", {
              message: "Internal Server Error! Please try again later.",
            });
          }
          res.render("login", {
            type: "success",
            message: "Registration successful!",
          });
        }
      );
    }
  });
};

module.exports = { register_get, register_post };