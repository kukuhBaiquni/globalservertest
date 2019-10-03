var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function(req, res) {
    const jsonData = fs.readFileSync("visitLog.json", "utf-8");
    const jsonParsed = JSON.parse(jsonData);
    const format = {
        name: "Anonymous",
        time: new Date()
    };
    jsonParsed.push(format);
    const jsonFormat = JSON.stringify(jsonParsed, null, 3);
    fs.writeFile("visitLog.json", jsonFormat, err => {
        if (err) {
            res.send("Server hang up!");
        } else {
            res.status(200).json({
                message: "Welcome home!"
            });
        }
    });
});

router.get("/home", (req, res) => {
    res.status(200).json({
        message: "Hello!"
    });
});

router.post("/profile", (req, res) => {
    if (req.header("Authentication") !== "token123") {
        res.status(401).json({
            error: "Unauthorized access!"
        });
    } else {
        res.status(200).json(req.body);
    }
});

router.get('/default-state', (req, res) => {
    const state = {
        name: 'TjimenQ',
        email: 'tjimenq.dewa@gmail.com',
    };
    res.status(200).json(state);
});

module.exports = router;
