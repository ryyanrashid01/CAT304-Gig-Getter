const session = require("express-session");
const pool = require("../db");

const gig_post_get = (req, res) => {
    res.render("gig_post");
    const [rows, fields] = pool.execute('SELECT * FROM `Gig_Post` WHERE `gigPostID` = ?', [2]);
    var Gig_Title = rows[0].gigTitle;
    var Gig_ID = rows[0].gigPostID;
    console.log(rows[0]);
};

const gig_post_post = async (req, res) => {
    res.render("gig_post");
};
  

//Temp
//var gig_index = 2;

/*async function Gig_Post(){

    const [rows, fields] = await pool.execute('SELECT * FROM `Gig_Post` WHERE `gigPostID` = ?', [2]);
    var Gig_Title = rows[0].gigTitle;
    var Gig_ID = rows[0].gigPostID;
    console.log(rows[0]);
};*/

module.exports = {gig_post_get, gig_post_post};
