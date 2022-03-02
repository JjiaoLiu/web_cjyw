const { Router } = require("express");

import * as status from "./../statusCode";
const router = Router();
router.post("/loginUser", function (req, res, next) {
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("loginUser")
    .findOne({ name: "cjyw" })
    .then(function (data) {
      if (data) {
        res.json({
          code: status.success,
          data: data,
        });
      } else {
        res.json({
          code: status.userError,
        });
      }
    })
    .catch(() => {
      res.status(status.serverError);
    });
});

module.exports = router;
