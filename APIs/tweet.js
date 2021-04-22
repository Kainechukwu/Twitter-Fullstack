const express = require("express");
const router = express.Router();
const Tweet = require("../Models/tweets");

router.route("/")
.post(function(req, res) {



  // const time = new Date().toLocaleTimeString();

  const tweet = new Tweet({
    user_id: req.body.user_id,
    tweet: req.body.tweet
    // ,
    // time: time //find how long ago a tweet was made
  });

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
