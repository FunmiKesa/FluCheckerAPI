var express = require("express");
var router = express.Router();
const FluService = require("../services/flu-service.js");

let fluService = new FluService();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/initialize", function(req, res, next) {
  status = fluService.createTable();
  console.log("Initialize status : " + status);
  if (status) {
    res.send("Database tables were successfully created.");
  } else {
    res.send("Database tables were not successfully created.");
  }
});

/*
Post flu data
*/
router.post("/upload", function(req, res, next) {
  fluService.insertData(req.body).then(status => {
    if (status) {
      body = "Uploaded flu data.";
      status = 200;
    } else {
      body = "Failed to save flu data.";
      status = 500;
    }
    res.status(status).send(body);
  });
});
module.exports = router;
