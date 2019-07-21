var express = require("express");
var router = express.Router();
var db =
  /* GET users listing. */
  router.get("/", function(req, res, next) {
    res.send("respond with a resource");
  });

/*
Post flu data
*/
router.post("/upload", function(req, res, next) {
  res.send("Uploaded flu data.");
});
module.exports = router;
