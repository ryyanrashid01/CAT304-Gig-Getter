const pool = require("../db");
const bcrypt = require("bcrypt");

const admin_login_get = (req, res) => {
  res.render("admin-login", { type: null, message: null });
};

const admin_login_post = async (req, res) => {
  var { username, password } = req.body;
  if (!username || !password) {
    res.render("admin-login", {
      type: "error",
      message: "Fields cannot be empty",
    });
  }

  // // Create admin account if there is no admin
  // var table_rows = await pool.query("SELECT * FROM Admin");
  // if (table_rows.length != 1) {
  //   let pass_hash = await bcrypt.hash(process.env.ADMIN_ACC_PASSWORD, 10);
  //   pool.query(
  //     "INSERT INTO Admin VALUES (?,?,?,?)",
  //     [221226, "super", pass_hash, 221226],
  //     (err, success) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log("Admin account created!");
  //     }
  //   );
  // }

  query = "SELECT * FROM Admin WHERE admin_Uname = '" + username + "'";
  pool
    .query(query)
    .then(async (result) => {
      result = result[0];
      if (result.length == 1) {
        var match = await bcrypt.compare(password, result[0].admin_Password);
        if (!match) {
          res.render("admin-login", {
            type: "error",
            message: "Password incorrect",
          });
        } else {
          req.session.admin_id = result[0].admin_ID;
          req.session.admin_Uname = result[0].admin_Uname;
          res.redirect("/admin-panel");
        }
      } else {
        res.render("admin-login", {
          type: "error",
          message: "Account not authorized",
        });
      }
    })
    .catch((err) => {
      res.render("admin-login", {
        type: "error",
        message: "Internal server error",
      });
    });
};

const admin_logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = { admin_login_get, admin_login_post, admin_logout };
