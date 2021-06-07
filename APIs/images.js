const express = require("express");
const router = express.Router();
const appRoot = process.env.appRoot;


router.route("/")
    .get(function (req, res) {
        const path = String(req.query.path);

        const file = appRoot + path //`${appRoot}${doc.profileImageUrl}`;
        console.log("file ", file)

        res.download(file, function (err) {
            if (err) {
                console.log(err);
                res.status(404).send("Not Found")            }
            if (!err) {
                // console.log("successfully downloaded file")
            }
        });

    })
module.exports = router;