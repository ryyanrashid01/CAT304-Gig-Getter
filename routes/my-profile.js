const pool = require("../db");
const bcrypt = require("bcrypt");

const my_profile_get = async (req, res) => {
  var user = {
    user_id: req.session.user_id,
    fName: req.session.fName,
    lName: req.session.lName,
    dob: req.session.dob,
    location: req.session.location,
  };
  if (req.session.user_id) {
    pool
      .query("SELECT * FROM Users WHERE user_id =?", [req.session.user_id])
      .then(async (result) => {
        result = result[0];
        const locations = await pool.query("SELECT * FROM Location");
        if (result[0]) {
          res.render("my_profile", {
            type: null,
            message: null,
            user: user,
            locations: locations[0],
          });
        } else {
          res.render("no_profile");
        }
      })
      .catch((err) => {
        console.log(err);
        res.render("my_profile", {
          type: "danger",
          message: "Internal Server Error. Please try again later.",
          user: user,
        });
      });
  } else {
    res.render("login", {
      type: "error",
      message: "Login to edit your profile.",
    });
  }
};

const my_profile_post = async (req, res) => {
  var {
    location,
    email,
    password,
    newPassword
  } = req.body;
  const locations = await pool.query("SELECT * FROM Location");

  var user = {
    user_id: req.session.user_id,
    fName: req.session.fName,
    lName: req.session.lName,
    dob: req.session.dob,
    location: req.session.location,
    passHash: null
  };

  pool.query(
    "SELECT * FROM Users WHERE user_id =?",
    [req.session.user_id]).then(async (result) => {
      result = result[0];
      if (result[0]) {
        // console.log(result[0]);
        user.passHash = result[0].prof_pass;
      }
      if (password || newPassword) {
        if (newPassword.length < 8) {
          res.render("my_profile", {
            type: "danger",
            message: "Password is too short. Minimum 8 characters.",
            user: user,
            locations: locations[0]
          });
        }
        const match = await bcrypt.compare(password, user.passHash);
        if (!match) {
          res.render("my_profile", {
            type: "danger",
            message: "Password Incorrect!",
            user: user,
            locations: locations[0]
          });
        } else {
          const newPassHash = await bcrypt.hash(newPassword, 5);
          pool.query("UPDATE Users SET prof_pass = '" + newPassHash + "' WHERE user_id = " + user.user_id).then((result) => {
            res.render("my_profile", {
              type: "success",
              message: "Password changed",
              user: user,
              locations: locations[0]
            });
          }).catch(err => {
            console.log(err);
            res.render("my_profile", {
              type: "danger",
              message: "Internal Server Error!",
              user: user,
              locations: locations[0]
            });
          });
        }
      }
      else {
        location = parseInt(location, 10);
        query = "UPDATE Users SET location_id = " + location + " WHERE user_id = " + user.user_id;
        pool.query(query).then(async (result) => {
          req.session.location = location;
          user.location = location;
          res.render("my_profile", {
            type: "success",
            message: "Changes saved successfully",
            user: user,
            locations: locations[0]
          });
        })
      }
    }).catch((err) => {
      console.log(err);
      res.render("my_profile", {
        type: "danger",
        message: "Internal Server Error. Please try again later.",
        user: user,
        locations: locations[0]
      });
    });
};

module.exports = { my_profile_get, my_profile_post };
