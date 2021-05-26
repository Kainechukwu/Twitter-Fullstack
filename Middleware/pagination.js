const Following = require("../Models/following");
const User = require("../Models/users.js");
const moment = require('moment');


function paginate(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    // console.log(req)

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};



    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit
      };
    }

    try {
      // console.log("user_id: " + req.headers.user_id);
      const following = await Following.find({ user_id: req.headers.user_id }, "following_id").exec();
      const userNames = await User.find({ _id: { $in: [req.headers.user_id, ...following.map(obj => obj.following_id)] } }, "firstName lastName").exec();

      // console.log("userNames: " + userNames);

      // console.log("followers_id: " + following.map(obj => obj.following_id));

      // results.resArray = await model.find({user_id: {$in: [req.headers.user_id, ...following.map(obj => obj.following_id)]}}, "user_id tweet").limit(limit).skip(startIndex);//.exec();
      resArray = await model.find(
        {
          user_id: {
            $in: [req.headers.user_id, ...following.map(obj => obj.following_id)]
          }
        }, "_id user_id tweet updatedAt"
      ).limit(limit).sort({ updatedAt: -1 }).skip(startIndex);//.exec();

      // console.log("results: " + results.resArray)

      // console.log("results: " + resArray)

      // results.resArray.forEach((obj)=>{

      //   for(let i = 0; i < userNames.length; i++){
      //     if(obj.user_id === userNames[i]._id) {
      //       obj["firstName"] = userNames[i].firstName;
      //       obj["lastName"] = userNames[i].lastName;

      //     }
      //   }

      // })

      function getMoment(str) {
        // const time = moment(str).fromNow();
        // return time
        const time = moment(String(str)).fromNow();
        return time.slice(0, time.length - 3)
      }

      function test(result, userNames) {






        return result.map((obj) => {
          let value = {};


          value['_id'] = obj._id;
          value['user_id'] = obj.user_id;
          value['tweet'] = obj.tweet;
          value["time"] = getMoment(obj.updatedAt);
          // console.log("mapping res array");
          for (let i = 0; i < userNames.length; i++) {
            if (String(obj.user_id) === String(userNames[i]._id)) {
              // console.log("setting firstname and lastname");
              value["firstName"] = userNames[i].firstName;
              value["lastName"] = "@" + userNames[i].lastName;
              // console.log(true)

            }
          }

          return value;
        });

      }


      results.resArray = test(resArray, userNames);
      console.log("tweets: ", resArray);
      // console.log("usernames: " + userNames);

      // console.log("results: " + JSON.stringify(results.resArray));




      res.paginatedResults = results;
      next();

    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message
      });
    }

    // model.slice(startIndex, endIndex);



  }

}

module.exports = paginate;
