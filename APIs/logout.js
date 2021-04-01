const express = require("express");
const router = express.Router();

router.route("/")
.get(function(req, res){
  req.logout();
  res.redirect("/");
});

module.exports = router;
