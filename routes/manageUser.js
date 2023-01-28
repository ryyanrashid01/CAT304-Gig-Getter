const moment = require("moment");
const express = require("express");
const session = require("express-session");
const pool = require("../db");

// const 
var info = [
    { id: 123, name: "Alfreds Futterkiste"},
    { id: 321, name: "Centro Moctezuma"},
];

JSON.stringify(info);

const manageUser_get = async (req ,res) => {
    var data = {
        admin_id:req.session.admin_id,
    };

    if(req.session.admin_id) {
        pool
        .query("SELECT * FROM Admin WHERE admin_id =?", [req.session.admin_id])
        .then(async (result) => {
            result = result[0];
            console.log(result[0]);
        const userList = await pool.query("SELECT * FROM Users");
        console.log(userList[0]);
        if(result[0]) {
            res.render("manageUser", {
                type: null,
                message: null,
                data: data,
                userList: userList[0],
            });
        }
        }
        )};
};

// const userListEdit_post = function (req, res) {
//     res.render("userListEdit", {
//         info:info,
//         // data:data,
//         // author:author, 
//         date: todaydate,})
// };



module.exports = manageUser_get;