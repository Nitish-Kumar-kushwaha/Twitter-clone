const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

// to get the signup form
router.get("/register", function (req, res) {
  res.render("auth/signup", { message: req.flash("error") });
});

//Registering the user

router.post("/register", async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
    };
    console.log(user);

    const newUser = await User.register(user, req.body.password);

    res.status(200).send(newUser);
  } catch (e) {
    req.flash("error", e.message);
    console.log(e);
    res.redirect("/register");
  }
});

//To get login page
router.get("/login", (req, res) => {
  res.render("auth/login");
});

//To login the user
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.render("home");
  }
);

// To logout

router.get("/logout", (req, res) => {
  req.logout();

  res.redirect("/login");
});

module.exports = router;
