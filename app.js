const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user");
const { isLoggedIn } = require("./middleware");

// const ejsLint = require('ejs-lint');

mongoose
  .connect("mongodb://localhost:27017/twitter-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(function () {
    console.log("DB is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// Routes
const authRoutes = require("./routes/authRoutes");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//For authentication
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoutes);
// app.use(ejsLint)

app.get("/", isLoggedIn, function (req, res) {
  res.render("home");
});

app.listen(3000, function () {
  console.log("server is running at port 3000");
});
