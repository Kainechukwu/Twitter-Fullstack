const express = require("express");
const router = express.Router();
const User = require("../Models/users");
const Following = require("../Models/following");


router.route("/")
.get(async function(req, res) {
    const users = await  User.find({}, "_id firstName lastName", { limit: 3 }).exec();

    // console.log("users:", users);
    let following = await Following.find({user_id: req.headers.user_id}, "following_id").exec();
    following = [req.headers.user_id, ...following.map(obj => obj.following_id)];
    const result = users.filter((user) => !following.includes(String(user._id)));

    // console.log("following:", following)
    // console.log("result:", result)

    res.send(result);
});

module.exports = router;

//get all users
//get all followers
//use followers to filter result of users

// const users = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const following = [3, 4, 7];

// const result = users.filter((user) => !following.includes(user))

// console.log(result)