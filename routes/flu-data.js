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
  fluService.insertData();
  res.send("Uploaded flu data.");
});
module.exports = router;
