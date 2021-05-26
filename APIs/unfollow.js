const express = require("express");
const { error } = require("winston");
const router = express.Router();
const Following = require("../Models/following");

router.route("/")
.delete(function (req, res){

  console.log("who to unfollow:", req.body.following_id);
  console.log(req.body.user_id, req.body.following_id);
  Following.findOneAndRemove({ following_id: req.body.following_id}, {user_id: req.body.user_id}, function (err) {
    if(err) {
      console.log(err)
      res.send(err)
    } else {
      console.log("successfully unfollowed");
      res.send("successfully unfollowed user");
    }
  });



});

module.exports = router;
