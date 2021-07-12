const express = require("express");
const router = express.Router();
const User = require("../models/user");

// to get the signup form
router.get("/register", function (req, res) {
  res.render("auth/signup");
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

module.exports = router;
