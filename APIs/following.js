const express = require("express");
const router = express.Router();
const Following = require("../Models/following");
// const User = require("../Models/users.js");

router.route("/")

// .get(function(req, res){
//   console.log(req.body.user_id, req.body.following_id);

// })

.post(function (req, res){

  console.log(req.body.user_id, req.body.following_id);



  const following = new Following({
    user_id: req.body.user_id,
    following_id: req.body.following_id,
  });

  following.save(function (err) {
    if(err) {
      console.log(err);
      res.send("err");
    } else {
      res.send("successfully followed user")
    }
  })


});

module.exports = router;
