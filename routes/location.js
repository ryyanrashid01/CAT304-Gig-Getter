const pool = require("../db");
const bcrypt = require("bcrypt");

const location_get = async (req, res) => {
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
        console.log(locations[0])
        if (result[0]) {
          res.render("location", {
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
      message: "Login first.",
    });
  }
};

// const service_get = async (req, res) => {
//     var user = {
//       user_id: req.session.user_id,
//       fName: req.session.fName,
//       lName: req.session.lName,
//       dob: req.session.dob,
//       location: req.session.location,
//       // services: null,
//       gigPostID: req.session.gigPostID,
//       gigTitle: req.session.gigTitle,
//     };
//     if (req.session.user_id) {
//       pool
//         .query("SELECT * FROM Users WHERE user_id =?", [req.session.user_id])
//         .then(async (result) => {
//           result = result[0];
//           const services = await pool.query("SELECT * FROM Gig_Post");
//           console.log(services[0]);
//           if (result[0]) {
//             res.render("location", {
//               type: null,
//               message: null,
//               user: user,
//               services: services[0],
//             });
//           } else {
//             res.render("no_profile");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           res.render("my_profile", {
//             type: "danger",
//             message: "Internal Server Error. Please try again later.",
//             user: user,
//           });
//         });
//     } else {
//       res.render("login", {
//         type: "error",
//         message: "Login first.",
//       });
//     }
//   };

const location_post = async (req, res) => {
  
  const location = req.body.location;
  // console.log(location);
  // const query = "SELECT GigTitle, GigDescription FROM Gig_Post WHERE location_id = " + location;
  
  // const query = "SELECT * FROM Gig_Post RIGHT JOIN Users ON Gig_Post.user_id=Users.user_id;
  // const query = "SELECT GigTitle, GigDescription FROM Gig_Post INNER JOIN Users ON Gig_Post.location_id=Users.location_id WHERE user_id = " + req.params.user_id;
  const query = ("SELECT * FROM Gig_Post JOIN Users ON Gig_Post.user_id=Users.user_id WHERE Gig_Post.location_id = " + location);


  
  const result = await pool.query(query);
  console.log(result[0]);
  res.render("marketplace", { marketplaces: result[0] });
};

// module.exports = { location_get, service_get };
module.exports = { location_get, location_post };