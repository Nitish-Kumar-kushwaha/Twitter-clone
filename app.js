const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

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

app.use(authRoutes);
// app.use(ejsLint)

app.get("/", function (req, res) {
  res.render("home");
});

app.listen(3000, function () {
  console.log("server is running at port 3000");
});
