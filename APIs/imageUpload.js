const express = require("express");
const router = express.Router();
const multer = require("multer")
const uuid = require("uuid").v4;

const upload = multer({dest: "uploads/"});

router.route("/")
.post(upload.single("file"), function (req, res){
    const {file} = req;
    console.log("imageUploadFile: ", file);
    

    res.send("successful");
});

module.exports = router;
