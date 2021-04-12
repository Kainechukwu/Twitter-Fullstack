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
      console.log(req.query.page)
      //
      console.log(res.paginatedResults);

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
      console.log(req.user.id);
    } else {
      res.send("You need to login");
    }
  })

  .post(function(req, res) {



    const time = new Date().toLocaleTimeString();

    const tweet = new Tweet({
      user_id: req.body.user_id,
      tweet: req.body.tweet,
      time: time //find how long ago a tweet was made
    });

    tweet.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/userHomePage");
      }
    });

  })

module.exports = router;
