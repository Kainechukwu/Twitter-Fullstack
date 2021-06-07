require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const signupAPIRouter = require("./APIs/signup.js");
const cors = require("cors");
const loginRouter = require("./APIs/login");
const userHomeRouter = require("./APIs/userHomePage");
const tweetAPI = require("./APIs/tweet");
const logoutRouter = require("./APIs/logout");
const followRouter = require("./APIs/following")
const deleteTweet = require("./APIs/delete");
const unfollowRouter = require("./APIs/unfollow");
const whoToFollowAPI = require("./APIs/whoToFollow");
const imageUploadAPI = require("./APIs/imageUpload")
const imagesAPI = require("./APIs/images");
const PORT = process.env.PORT || 3000;
let path = require('path');
global.appRoot = path.resolve(__dirname);

// console.log("appRoot", global.appRoot);
// console.log("this", globalThis.appRoot);
// console.log(global)
// console.log("how?")

// const buildDevLogger = require("./logger/devLogger.js");

// logger.info("Text info");
// logger.error("Text error");
// console.log(new ObjectId)

const app = express();
const User = require("./Models/users.js");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: "http://localhost:4000", //  Location of the react app you're trying to connect to
  credentials: true,
  exposedHeaders: "user_id"
}));


app.use(session({
  secret: "Our little secret.",
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser("Our little secret."));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

mongoose.connect("mongodb://localhost:27017/TwitterDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.set("useCreateIndex", true);



passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/signup", signupAPIRouter);
app.use("/login", loginRouter);
app.use("/userHomePage", userHomeRouter);
app.use("/logout", logoutRouter);
app.use("/follow", followRouter);
app.use("/tweet", tweetAPI);
app.use("/deleteTweet", deleteTweet);
app.use("/unfollow", unfollowRouter);
app.use("/whoToFollow", whoToFollowAPI)
app.use("/imageUpload", imageUploadAPI);
app.use("/images", imagesAPI);

app.get("/", function(req, res){
  res.send("This is the home page");
});

app.listen(PORT, function(err) {
  if (!err) {
    console.log(`Wormhole active on port ${PORT}`);
  }
});
