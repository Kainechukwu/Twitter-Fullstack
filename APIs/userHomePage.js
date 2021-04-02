const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const Tweet = require("../Models/tweets");
const ObjectId = mongoose.Types.ObjectId;



router.route("/")
  .get(function(req, res) {
    if (req.isAuthenticated()) {
      res.send("This is the user home page");

      Tweet.find({}, function(err, foundTweets){
        if(err) {
          console.log(err);
        } else {
          // foundTweets.forEach(function(tweet){
          //   console.log(tweet);
          // });
          console.log("tweets are displayed here");
        }
      });
      // console.log(req.user.id);
    } else {
      res.send("You need to login");
    }
  })

  .post(function (req, res){
    // const time = new Date().toLocaleTimeString();
    // const tweet = new Tweet ({
    //   _id: req.body._id,
    //   tweet: req.body.tweet,
    //   time: time//find how long ago a tweet was made
    // });
    //
    // tweet.save(function (err) {
    //   if(err) {
    //     console.log(err);
    //   } else {
    //     res.redirect("/userHomePage");
    //   }
    // });

    Tweet.findOne({
      user_id: req.body.user_id
    }, function(err, foundDoc) {
      const time = new Date().toLocaleTimeString();
      if (!foundDoc) {
        const tweet = new Tweet({
          user_id: req.body.user_id,
          userTweets: [{
            _id: new ObjectId,
            tweet: req.body.tweet,
            time: time
          }] //find how long ago a tweet was made
        });

        tweet.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/userHomePage");
          }
        });

      } else {
        foundDoc.userTweets.push({
          _id: new ObjectId,
          tweet: req.body.tweet,
          time: time

        });

        foundDoc.save(function(err){
          if(err){
            console.log(err);
          } else {
            console.log(foundDoc.userTweets);
            res.redirect("/userHomePage");
          }
        });
      }



    })
  });

module.exports = router;
