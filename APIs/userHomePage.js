const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const Tweet = require("../Models/tweets");
const ObjectId = mongoose.Types.ObjectId;
const paginate = require("../Middleware/pagination");



router.route("/")
  .get(paginate(Tweet), function(req, res) {
    if (req.isAuthenticated()) {
      res.send("This is the user home page");
      // console.log(req.query.page)
      // // //
      console.log(res.paginatedResults);
      console.log(`Sucessful login`)

      // Tweet.find({}, function(err, foundTweets) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     // foundTweets.forEach(function(tweet){
      //     //   console.log(tweet);
      //     // });
      //     console.log("tweets are displayed here");
      //   }
      // });
      // console.log(req.user.id);
    } else {
      res.send("You need to login");
    }
  });



module.exports = router;
