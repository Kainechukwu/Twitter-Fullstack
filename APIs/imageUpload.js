const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path");
const uuid = require("uuid").v4;
const User = require("../Models/users.js");
const fs = require('fs-extra')
const appRoot = process.env.appRoot;


console.log(appRoot)


// const upload = multer({dest: "uploads/"});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

        // data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
        // console.log(data);



    }


})
// console.log(storage.filename)
// console.log(storage.destination)

let upload = multer({ storage: storage }).single('file')

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
                console.log("file ", file)
                
                res.download(file, function (err) {
                    if(err){
                        console.log(err);
                    }
                    if(!err){
                        console.log("successfully downloaded file")
                    }
                }); 

                // res.sendFile(file, (err) => {
                //     if(err){
                //         console.log(err);
                //     }
                //     if(!err){
                //         console.log("successfully sent file")
                //     }
                // }); 
            }
        });

        // console.log("hello")

        // const path = 'app/assets/my_image_name.xlsx' // where to save a file

        // // const request = http.get(url, function (response) {
        //     if (response.statusCode === 200) {
        //         var file = fs.createWriteStream(path);
        //         response.pipe(file);
        //     }
        //     request.setTimeout(60000, function () { // if after 60s file not downlaoded, we abort a request 
        //         request.abort();
        //     });
        // // });


        // app.get('/download', function (req, res) {
        //     const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
        //     res.download(file); // Set disposition and send it.
        // });

        // req.setTimeout(60000, function () { // if after 60s file not downlaoded, we abort a request 
        //     request.abort();
        // });
    })


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
