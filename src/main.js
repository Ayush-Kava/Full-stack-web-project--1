const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyparser = require("body-parser");
const path = require("path");
const hbs = require("hbs");
const dotenv = require("dotenv");    
const helpers = require("handlebars-helpers")();

dotenv.config();
hbs.registerHelper(helpers);

const app = express();
// const {
//     router
// } = require("../router");
const routes = require("../routes/index");
const connectMongo = require("../connection/mongo-connect");

app.use(session({
    secret: "Akuser",  // Used to sign session ID cookies
    resave: false,              // Prevents session being saved on every request
    saveUninitialized: true,    // Saves new session even if not modified
    cookie: { secure: false }   // Set `true` if using HTTPS
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.set("view engine", "hbs");
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "../public")));

// const static_path = path.join(__dirname, "../views");
// app.use(express.static(static_path));
app.use("/",routes);
app.listen(process.env.PORT, () => {
    console.log(`Server Is Started! at ${process.env.PORT}`);
})

connectMongo(process.env.MONGOURL);