const { Router } = require("express");
import { validate } from "schema-utils";
import loginUser from "./../model/loginUser.json";
import * as status from "./../statusCode";
const router = Router();
router.post("/auth/login", function (req, res, next) {
  console.log(req.body);
  // const configuration = { name: "Loader Name/Plugin Name/Name" };
  // var a = validate(loginUser, req.body, configuration);
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("loginUser")
    .findOne({ name: req.body.name })
    .then(function (data) {
      console.log("findOne", data);
      if (data) {
        res.json({
          code: status.success,
          data: data,
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
