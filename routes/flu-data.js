var express = require("express");
var router = express.Router();
const FluService = require("../services/flu-service.js");

let fluService = new FluService();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/initialize", function(req, res, next) {
  fluService.createTable();
});

/*
Post flu data
*/
router.post("/upload", function(req, res, next) {
  console.log(req);
  status = fluService.insertData(req);
  if (status) {
    body = "Uploaded flu data.";
  } else {
    body = "Failed to save flu data.";
  }
  res.status(status).send(body);
});
module.exports = router;
