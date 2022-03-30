const { Router } = require("express");
import * as status from "./../statusCode";
// JWT
const jwt = require("jsonwebtoken");
const secretKey = "web_cjyw";
const router = Router();
router.post("/auth/login", function (req, res, next) {
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("loginUser")
    .findOne({ name: req.body.name })
    .then(function (data) {
      if (data) {
        let token =
          "Bearer " +
          jwt.sign({ username: data.name }, secretKey, {
            expiresIn: "10h",
          });
        res.json({
          code: status.success,
          data: data,
          token: token,
          message: "success",
        });
      } else {
        res.json({
          code: status.userError,
          message: "用户名不存在或密码错误",
        });
      }
    })
    .catch(() => {
      console.log("catch");
      res.status(status.serverError);
    });
});

module.exports = router;
