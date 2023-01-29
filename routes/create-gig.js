const moment = require ("moment");
const pool = require("../db");

const create_gig_get = async (req,res) => {

    var user = {
        user_id: req.session.user_id,
        lName: req.session.lName,
        fName: req.session.fName,
        email: req.session.email,
        location : req.session.location,
        location_name: req.session.location_name,
    };

    if (req.session.user_id) {
        pool
          .query("SELECT * FROM Users WHERE user_id =?", [req.session.user_id])
          .then(async (result) => {
            result = result[0];
            var location_name = await pool.query("SELECT location_name FROM Location WHERE location_id =" + req.session.location);
            // location_name=location_name[0]
            console.log(location_name[0]);
            if (result[0]) {
              res.render("create-gig", {
                type: null,
                message: null,
                user: user,
                location_name: location_name[0],
              });
            } else {
              res.render("no_profile");
            }
          })
          .catch((err) => {
            console.log(err);
            res.render("create-gig", {
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


        // res.render("create-gig", {
        //     user:user,
        // });
    
};

const create_gig_post = async (req,res) => {
    var {
        // gigPostID,
        gigTitle,
        gigDesc,
        minBidAmt,
        startBidAmt,
        endBidDate,
        GigImage,
    } = req.body;
    // const locations = await pool.query("SELECT * FROM Location");

    var user = {
        user_id: req.session.user_id,
        fName: req.session.fName,
        lName: req.session.lName,
        email:req.session.email,
        location: req.session.location
    };
    var location_name = await pool.query("SELECT location_name FROM Location WHERE location_id =" + req.session.location);

    pool.query("SELECT * FROM Users WHERE user_id =?",
    [req.session.user_id]).then(async (result) => {
      result = result[0];
      if (result[0]) {
        console.log(req.session.user_id);
        console.log(req.body);
      }
      if ((minBidAmt || startBidAmt) < 1) {
        res.render("create-gig", {
          type : "danger",
          message: "Bidding amount should not be less than RM1",
          user:user,    
        });
      }
      else {
        pool.query("INSERT INTO Gig_Post (user_id, gigTitle, gigDescription, minBid, startBid, endBid, location_id, GigImage) VALUES (?,?,?,?,?,?,?,?)",
        [req.session.user_id, gigTitle, gigDesc, minBidAmt, startBidAmt, endBidDate, req.session.location, GigImage]
        ).then(() => {
          res.render("create-gig", {
            user: req.session,
            location_name: location_name[0],
            type: "success",
            message: "Gig registration successful!",
          });
        })
      }
    }).catch((err) => {
      console.log(err);
      res.render("create-gig", {
        type: "danger",
        message: "Internal Server Error. Please try again later.",
        user: user,
      });
    });

};

module.exports ={ create_gig_get, create_gig_post };