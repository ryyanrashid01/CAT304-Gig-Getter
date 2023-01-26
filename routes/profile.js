const pool = require("../db");
const moment = require("moment");

const profile_get = async (req, res) => {
  const query =
    "SELECT * FROM Users JOIN Location ON Users.location_id=Location.location_id WHERE user_id = " +
    req.params.userId;
  result = await pool.query(query);
  result = result[0];
  // console.log(result[0]);
  if (result[0]) {
    const user_id = result[0].user_id;
    const fName = result[0].fName;
    const lName = result[0].lName;
    const email = result[0].email;
    const dob = moment(result[0].dob).format("MMM DD, YYYY");
    const location = result[0].location_name;
    const status = result[0].status;

    res.render("profile", {
      user_id: user_id,
      fName: fName,
      lName: lName,
      email: email,
      dob: dob,
      location: location,
      status: status,
    });
  } else {
    res.render("no-profile");
  }
};

module.exports = { profile_get };
