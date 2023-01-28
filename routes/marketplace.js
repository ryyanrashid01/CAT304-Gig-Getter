const pool = require("../db");
const bcrypt = require("bcrypt");

const marketplace_get = async (req, res) => {
  var user = {
    user_id: req.session.user_id,
    gigPostID: req.session.gigPostID,
    gigTitle: req.session.gigTitle,
    gigDescription: req.session.gigDescription,
    location: req.session.location,
  
  };
  if (req.session.user_id) {
    pool
      .query("SELECT * FROM Users WHERE user_id =?", [req.session.user_id])
      .then(async (result) => {
        result = result[0];
        const marketplaces = await pool.query("SELECT * FROM Gig_Post");
        if (result[0]) {
          res.render("marketplace", {
            type: null,
            message: null,
            user: user,
            marketplaces: marketplaces[0],
          });
        } else {
          res.render("no_marketplace");
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


module.exports = { marketplace_get };

// const pool = require("../db");


// const marketplace_get = async (req, res) => {
//   const query =
//     "SELECT * FROM Users JOIN Location ON Users.location_id=Location.location_id WHERE user_id = " +
//     req.params.userId;
//   result = await pool.query(query);
//   result = result[0];
//   // console.log(result[0]);
//   if (result[0]) {
//     const gigPostID = result[0].gigPostID;
//     const user_id = result[0].user_id;
//     const gigTitle = result[0].gigTitle;
//     const gigDescription = gigDescription;
//     // const dob = moment(result[0].dob).format("MMM DD, YYYY");
//     // const location = result[0].location_name;


//     res.render("marketplace", {
//       gigPostID: gigPostID,
//       user_id: user_id,
//       gigTitle: gigTitle,
//       gigDescription: gigDescription,
//     });
//   } else {
//     res.render("no-profile");
//   }
// };

// module.exports = { marketplace_get };