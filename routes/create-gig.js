const moment = require ("moment");
//const pool = require("../db");

const create_gig_get = function (req,res) {

    var user = {
        user_id: req.session.user_id,
        lName: req.session.lName,
        email: req.session.email,
        location : req.session.location
    };

    res.render("create-gig");



    // if (req.session.user_id) {
    //     pool
    //       .query("SELECT * FROM Users WHERE user_id =?", [req.session.user_id])
    //       .then(async (result) => {
    //         result = result[0];
    //         const locations = await pool.query("SELECT * FROM Location");
    //         if (result[0]) {
    //           res.render("create-gig", {
    //             type: null,
    //             message: null,
    //             user: user,
    //             locations: locations[0],
    //           });
    //         } else {
    //           res.render("no_profile");
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         res.render("mcreate-gig", {
    //           type: "danger",
    //           message: "Internal Server Error. Please try again later.",
    //           user: user,
    //         });
    //       });
    //   } else {
    //     res.render("login", {
    //       type: "error",
    //       message: "Login to edit your profile.",
    //     });
    //   }

    // res.render("create-gig", {
    //     user_id: user_id,
    //     lName: lName,
    //     email: email,
    //     location: location,
    // });

    // const query = 
    // "SELECT * FROM Users JOIN Location ON Users.location_id=Location.location_id WHERE user_id = " +
    // req.params.userId;
    // result  = await pool.query(query);
    // result = result[0];

    // if(result[0]) {
    //     const user_id = result[0].user.id;
    //     const lName = result[0].lName;
    //     const email = result[0].email;
    //     const location = result[0].location_name;

    //     res.render("create-gig", {
    //         user_id: user_id,
    //         lName: lName,
    //         email: email,
    //         location:location,

    //     });
    // } else {
    //     res.render("no-profile");
    // }
    
};

const create_gig_post = function (req,res) {
    res.render("create-gig");
};

module.exports =( create_gig_get, create_gig_post );