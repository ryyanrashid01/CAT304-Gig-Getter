const moment = require("moment");
const { escape } = require("mysql2");
const bcrypt = require("bcrypt");

const pool = require("../db");

let todayDate = moment().subtract(13, "years").format("YYYY-MM-DD");

const register_get = async (req, res) => {
  if (req.session.user_id) {
    res.redirect("/");
    return;
  }
  const locations = await pool.query("SELECT * FROM Location");
  res.render("register", {
    message: null,
    date: todayDate,
    locations: locations[0],
  });
};

const register_post = async (req, res) => {
  var { fName, lName, dob, location, email, password } = req.body;

  if (!fName || !lName || !dob || !email || !password) {
    res.render("register", {
      message: "Please fill all the fields",
      date: todayDate,
    });
  }

  // Change format of date
  dob = moment(dob).format("YYYY-MM-DD");
  const locations = await pool.query("SELECT * FROM Location");

  if ((await moment(dob).diff(todayDate, "days")) > 0) {
    res.render("register", {
      message: "User must be at least 13 year old to register",
      date: todayDate,
    });
    return;
  }

  // Check if email already exists in database
  var query = "SELECT * FROM Users WHERE email = " + escape(email);

  var isEmailRegistered = await pool
    .query(query)
    .then((result) => {
      if (result[0]) {
        isEmailRegistered = true;
      } else {
        isEmailRegistered = false;
      }
    })
    .catch((err) => {
      res.render("register", {
        message: "Internal Server Error! Please try again later.",
        date: todayDate,
        locations: locations[0],
      });
    });

  if (isEmailRegistered) {
    res.render("register", {
      message: "Email already in use. Sign in or use another email.",
      date: todayDate,
      locations: locations[0],
    });
  } else {
    fName = fName.charAt(0).toUpperCase() + fName.slice(1);
    lName = lName.charAt(0).toUpperCase() + lName.slice(1);
    location = parseInt(location, 10);
    const passHash = await bcrypt.hash(password, 5);
    pool
      .query(
        "INSERT INTO Users(fName, lName, dob, location_id, email, prof_pass, status) VALUES (?,?,?,?,?,?,?)",
        [fName, lName, dob, location, email, passHash, "active"]
      )
      .then(() => {
        res.render("login", {
          type: "success",
          message: "Registration successful!",
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("register", {
          message: "Internal Server Error! Please try again later.",
          date: todayDate,
          locations: locations[0],
        });
      });
  }
};

module.exports = { register_get, register_post };
