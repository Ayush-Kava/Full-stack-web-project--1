const express = require("express");
const router = express.Router();

const {userModel} = require("../model/user-model");

router.get("/login", async (req, res) => {
  return res.render("login.hbs");
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await userModel.findOne({email});
    if (!user) {
      return res.render("login", {error: "User Not Available. Please Register."});
    }

    if (user.password !== password) {
      return res.render("login", {error: "Incorrect password. Try again."});
    } else {
      req.session.user = user;
      return res.redirect("/general/home");
    }
  } catch (error) {
    console.log("error in finding user", error);
  }
});

router.get("/register", async (req, res) => {
  return res.render("register.hbs");
});

router.post("/register", async (req, res) => {
  // res.render('register.hbs');
  const newUser = await userModel({name: req.body.name, email: req.body.email, password: req.body.password});
  newUser.save();

  return res.redirect("/auth/login");
});

router.get("/logout",async (req,res) => {
  req.session.destroy((err)=>{
    if(err){
      console.log("Error destroying session:", err);
      return res.status(500).send("Could not log out.");
    }
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.redirect("/auth/login");
  })
})

module.exports = router;