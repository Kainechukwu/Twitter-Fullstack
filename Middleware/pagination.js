const Following = require("../Models/following");

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
      console.log(req.headers.user_id);
      const following = await Following.find({user_id: req.headers.user_id}, "following_id").exec();
      console.log(following.map(obj => obj.following_id));
      
      results.resArray = await model.find({user_id: {$in: [req.headers.user_id, ...following.map(obj => obj.following_id)]}}, "tweet").limit(limit).skip(startIndex);//.exec();
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
