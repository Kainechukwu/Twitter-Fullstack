const mongoose = require("mongoose");


const followingSchema = new mongoose.Schema({

  user_id: String,
  following_id: String

});


module.exports = mongoose.model("Following", followingSchema);
