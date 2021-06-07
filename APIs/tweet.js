const express = require("express");
const router = express.Router();
const Tweet = require("../Models/tweets");
const multer = require("multer")
const path = require("path");
const appRoot = process.env.appRoot;


// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     // cb(null, Date.now() + '-' + file.originalname)
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));


//   }


// });
console.log("des: ", appRoot +'public/uploads')
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename(req, file, cb) {
   console.log("tweetImage:", file);
   cb(null, 
    // `${file.originalname}-${new Date()}`
    file.fieldname + '-' + Date.now() + path.extname(file.originalname)
   );
  }
});

// let upload = multer({ storage: storage }).single('file');
let upload = multer({ storage: storage });



router.route("/")
  .post(upload.single('file'), function (req, res) {

    // console.log("body: ", req.body);
    console.log("text: ", req.body.data);
    console.log("files: ", req.file);
    // console.log("TweetImgPath2: ", req.body.file);


    // upload(req, res, function (err) {
    //   if (err instanceof multer.MulterError) {
    //     console.log("err:", err)

    //     return res.status(500).json(err)
    //   } else if (err) {
    //     console.log("err:", err)
    //     return res.status(500).json(err)


    //   }
    //   console.log("TweetImgPath1: ", req.body.data);
    //   console.log("TweetImgPath2: ", req.body.files);

    //   // console.log(req.headers.user_id);



    //   // return res.status(200).send(req.file.path)

    // })

    // console.log("TweetImgPath2: ", req.file.path)
    // const userNames = await  User.findById(req.headers.user_id, "firstName lastName");
    // console.log("userNames" + userNames);




    //---------------tweet--------------------


    const tweet = new Tweet({
      user_id: req.headers.user_id,
      tweet: req.body.data,
      tweetImage: req.file.path
      // name: userNames.firstName,
      // handle: "@" + userNames.lastName
      // ,
      // time: time //find how long ago a tweet was made
    });

    // console.log(req.headers.user_id);
    // console.log(req.body.tweet);

    tweet.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        // res.redirect("/userHomePage?page=1&limit=3");
        console.log("Successfully saved tweet");
        res.status(200).send("Tweet Successful");
      }
    });

    // console.log("req:", req.body)

  });

module.exports = router;
