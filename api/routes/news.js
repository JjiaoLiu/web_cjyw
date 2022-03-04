const { Router } = require("express");
import * as status from "./../statusCode";
const router = Router();
router.get("/news/list", function (req, res, next) {
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("news")
    .find({})
    .toArray()
    .then(function (data) {
      if (data) {
        res.json({
          code: status.success,
          data: data,
          message: "success",
        });
      }
    })
    .catch(() => {
      console.log("catch");
      res.status(status.serverError);
    });
});

module.exports = router;
