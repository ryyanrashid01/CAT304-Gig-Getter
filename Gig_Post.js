//Setup MySQL2
const mysql = require('mysql2/promise');

//Temp
var gig_index = 2;

async function Gig_Post(){

    //Connect to database
    const connection = await mysql.createConnection({
        host: 'sql12.freesqldatabase.com',
        user: 'sql12592913',
        database: 'sql12592913',
        password: 'VCmJjDvxQy'
    });

    const [rows, fields] = await connection.execute('SELECT * FROM `Gig_Post` WHERE `gigPostID` = ?', [2]);
    var Gig_Title = rows[0].gigTitle;
    var Gig_ID = rows[0].gigPostID;
    console.log(rows[0]);
};



//Create variables to store the post's bid information
var Minimum_Bid = 2.0;
var Current_Bid = 60.0;
var User_Bid = 0.0;

Gig_Post();
