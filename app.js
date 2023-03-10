// Install packages
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Access database
const pool = require("./db");

// Import route modules
const { register_get, register_post } = require("./routes/register");
const index = require("./routes/index");
const { login_get, login_post, logout } = require("./routes/login");
const {
  admin_login_get,
  admin_login_post,
  admin_logout,
} = require("./routes/admin-login");
const { admin_panel_get } = require("./routes/admin-panel");
const {
  admin_register_get,
  admin_register_post,
} = require("./routes/admin-register");
const { profile_get } = require("./routes/profile");
const { my_profile_get, my_profile_post } = require("./routes/my-profile");

// anis
const { marketplace_get, marketplace_post } = require("./routes/marketplace");

// justin
const {
  gig_post_get,
  gig_post_post
} = require("./routes/gig_post");


const { create_gig_get, create_gig_post } = require("./routes/create-gig");

const manageUser_get = require("./routes/manageUser");


// Set up Express JS
const app = express();

app.use(cookieParser());

// Configure session
app.use(
  session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 7 * 24 * 60 * 60 * 100,
    },
  })
);

// Configure ejs
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

// Listening port
const port = process.env.PORT || 3000;

// Routes
app.get("/", index);

app.get("/login", login_get);

app.post("/login", login_post);

app.get("/logout", logout);

app.get("/register", register_get);

app.post("/register", register_post);

app.get("/admin-login", admin_login_get);

app.post("/admin-login", admin_login_post);

app.get("/admin-panel", admin_panel_get);

app.get("/admin-logout", admin_logout);

app.get("/admin-register", admin_register_get);

app.post("/admin-register", admin_register_post);

app.get("/profile", my_profile_get);

app.post("/profile", my_profile_post);

app.get("/profile/:userId", profile_get);

// anis
app.get("/marketplace", marketplace_get);

app.post("/marketplace", marketplace_post);

// justin
app.get("/gig_post", gig_post_get);

app.post("/gig_post", gig_post_post);

//afina
app.get("/create-gig", create_gig_get);

app.post("/create-gig", create_gig_post);

app.get("/manageUser", manageUser_get);

app.listen(port, function () {
  console.log("Server started on port " + port);
});

