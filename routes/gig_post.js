const session = require("express-session");
//const pool = require("../db");

//Create connection
const mysql = require('mysql2/promise');


const gig_post_get = async (req, res) => {

    const connection = await mysql.createConnection({

        host: 'sql12.freesqldatabase.com',
        user: 'sql12592913',
        database: 'sql12592913',
        password: 'VCmJjDvxQy'
    
    });

    var [rows, fields] = await connection.execute('SELECT * FROM `Gig_Post` WHERE `gigPostID` = ?', [req.session.gigPostID]);
    req.session.gigTitle = rows[0].gigTitle;
    req.session.gigDescription = rows[0].gigDescription;
    req.session.gigPoster = rows[0].user_id;
    req.session.minBid = rows[0].minBid;
    req.session.startBid = rows[0].startBid;
    req.session.endBid = rows[0].endBid.toDateString();

    var buf = rows[0].GigImage;
    req.session.gigImage = 'data:image/jpeg;base64,' + buf.toString('base64');

    [rows, fields] = await connection.execute('SELECT * FROM `Gig_Bid` WHERE `gigPostID` = ?', [req.session.gigPostID]);
    
    if (rows[0]?.Highest_Bid == undefined){
        req.session.highestBid = req.session.startBid;
        req.session.highestBidder = " - ";
        req.session.noBidder = 1;
    }
    else{
        req.session.highestBid = rows[0].Highest_Bid;
        req.session.highestBidder = rows[0].user_id;
        [rows, fields] = await connection.execute('SELECT * FROM `Users` WHERE `user_id` = ?', [req.session.highestBidder]);
        req.session.highestBidder = rows[0].fName + " " + rows[0].lName;
        req.session.noBidder = 0;
    }
    
    connection.end();
    res.render("gig_post", {session: req.session});
};

const gig_post_post = async (req, res) => {

    const connection = await mysql.createConnection({

        host: 'sql12.freesqldatabase.com',
        user: 'sql12592913',
        database: 'sql12592913',
        password: 'VCmJjDvxQy'
    
    });

    var addBid = req.body.addBid;

    if (req.session.noBidder == 1){
        connection.query('INSERT INTO `Gig_Bid` (gigPostID, user_id, Highest_Bid) VALUES (?,?,?)', [req.session.gigPostID, req.session.user_id, addBid]);
    }
    else{
        connection.query('UPDATE `Gig_Bid` SET user_id = ?, Highest_Bid = ? WHERE gigPostID = ?', [req.session.user_id, addBid, req.session.gigPostID]);
    }

    connection.end();

    res.redirect("gig_post");
};
  

module.exports = {gig_post_get, gig_post_post};
