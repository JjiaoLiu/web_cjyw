const { Router } = require("express");
import * as status from "./../statusCode";
const router = Router();
router.get("/news/list", function (_req, res) {
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
      res.status(status.serverError);
    });
});
router.put("/news/put", function (req, res) {
  let id = req.body.id;
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("news")
    .updateOne({ id: id }, { $set: { title: req.body.title } })
    .then(function () {
      res.json({
        code: status.success,
        message: "success",
      });
    })
    .catch(() => {
      res.status(status.serverError);
    });
});
router.delete("/news/delete", function (req, res) {
  let id = req.body.id;
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("news")
    .deleteOne({ id: id })
    .then(function () {
      res.json({
        code: status.success,
        message: "success",
      });
    })
    .catch(() => {
      res.status(status.serverError);
    });
});
router.post("/news/add", function (req, res) {
  let obj = req.body;
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("news")
    .insertOne(obj)
    .then(function () {
      res.json({
        code: status.success,
        message: "success",
      });
    })
    .catch(() => {
      res.status(status.serverError);
    });
});
module.exports = router;
