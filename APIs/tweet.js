const express = require("express");
const router = express.Router();
const Tweet = require("../Models/tweets");
// const User = require("../Models/users.js");


router.route("/")
.post( function(req, res) {
  // const userNames = await  User.findById(req.headers.user_id, "firstName lastName");
  // console.log("userNames" + userNames);



  const tweet = new Tweet({
    user_id: req.headers.user_id,
    tweet: req.body.tweet,
    // name: userNames.firstName,
    // handle: "@" + userNames.lastName
    // ,
    // time: time //find how long ago a tweet was made
  });

  console.log(req.headers.user_id);
  console.log(req.body.tweet);

  tweet.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      // res.redirect("/userHomePage?page=1&limit=3");
      console.log("Successfully saved tweet");
      res.status(200).send("Tweet Successful");
    }
  });

});

module.exports = router;
