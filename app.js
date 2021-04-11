require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const signupAPIRouter = require("./APIs/signup.js");
const loginRouter = require("./APIs/login");
const userHomeRouter = require("./APIs/userHomePage");
const logoutRouter = require("./APIs/logout");
const followRouter = require("./APIs/following")
const PORT = process.env.PORT || 3000;


// console.log(new ObjectId)

const app = express();
const User = require("./Models/users.js");


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/TwitterDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);


passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/signup", signupAPIRouter);
app.use("/login", loginRouter);
app.use("/userHomePage", userHomeRouter);
app.use("/logout", logoutRouter);
app.use("/userHomePage/follow", followRouter);

app.get("/", function(req, res){
  res.send("This is the home page");
});

app.listen(PORT, function(err) {
  if (!err) {
    console.log(`Wormhole active on port ${PORT}`);
  }
});
