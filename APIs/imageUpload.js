const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path");
// const uuid = require("uuid").v4;
const User = require("../Models/users.js");
// const fs = require('fs-extra')
const appRoot = process.env.appRoot;


console.log(appRoot)




let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));


    }


})


let upload = multer({ storage: storage }).single('file');

router.route("/")


    .get(function (req, res) {
        const user_id = String(req.query.user_id)
        

        // const url = await User.find({ _id: user_id }, "profileImageUrl").exec();

        // console.log(url.profileImageUrl)

    
        User.findById(user_id, "profileImageUrl", function (err, doc) {
            if (err) {
                console.log(err)
            }

            if (doc.profileImageUrl) {


                const file = appRoot + doc.profileImageUrl //`${appRoot}${doc.profileImageUrl}`;
                // console.log("file ", file)
                
                res.download(file, function (err) {
                    if(err){
                        console.log(err);
                    }
                    if(!err){
                        // console.log("successfully downloaded file")
                    }
                }); 

 
            }
        });

    })


    .post(function (req, res) {
        // const {file} = req;
        // console.log("imageUploadFile: ", req.file);
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("err:", err)

                return res.status(500).json(err)
            } else if (err) {
                console.log("err:", err)
                return res.status(500).json(err)


            }
            console.log(req.file);
            console.log(req.headers.user_id);



            User.findOneAndUpdate({ _id: req.headers.user_id }, { $set: { profileImageUrl: req.file.path } }, {
                new: true,
                upsert: true,
                // rawResult: true // Return the raw result from the MongoDB driver
            }, function (err, doc) {
                if (err) {
                    console.log(err)
                }
            });



            return res.status(200).send(req.file.path)

        })




    });

module.exports = router;
