const express = require("express");
const router = express.Router();
const multer = require("multer")
const uuid = require("uuid").v4;

// const upload = multer({dest: "uploads/"});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

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
            return res.status(200).send(req.file)

        })

        
    });

module.exports = router;
