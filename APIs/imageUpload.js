const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path");
const uuid = require("uuid").v4;
const User = require("../Models/users.js");


// const upload = multer({dest: "uploads/"});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));



    }


})
console.log(storage.filename)
console.log(storage.destination)

let upload = multer({ storage: storage }).single('file')

router.route("/")
    .post(function (req, res) {
        // const {file} = req;
        // console.log("imageUploadFile: ", file);
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("err:", err)

                return res.status(500).json(err)
            } else if (err) {
                console.log("err:", err)
                return res.status(500).json(err)
                

            }
            console.log(req.file.path);
            console.log(req.headers.user_id);

            const filter = {_id: req.headers.user_id};
            const update = {$push: {profileImageUrl: req.file.path}}

            User.findOneAndUpdate({_id: req.headers.user_id}, {$set: {profileImageUrl: req.file.path}}, {
                new: true,
                upsert: true,
                // rawResult: true // Return the raw result from the MongoDB driver
              }, function (err, doc){
                  if(err){
                      console.log(err)
                  }
              });



            return res.status(200).send(req.file.path)

        })

       

        
    });

module.exports = router;
