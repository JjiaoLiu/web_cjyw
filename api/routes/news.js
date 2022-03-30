const { Router } = require("express");
import { ObjectId } from "mongodb";
import * as status from "./../statusCode";
const router = Router();
router.get("/news/list", function (req, res) {
  var dbo = global.mongodb.db("g1");
  var key = req.query.key;
  var reg = new RegExp(key, "gi");
  dbo
    .collection("news")
    .find({ title: { $regex: reg } })
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
  let _id = req.body._id;
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("news")
    .updateOne({ _id: ObjectId(_id) }, { $set: { title: req.body.title } })
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
router.delete("/news/delete/:id", function (req, res) {
  let _id = req.params.id;
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("news")
    .deleteOne({ _id: new ObjectId(_id) })
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
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("news")
    .insertOne({ title: req.body.title })
    .then(function (data) {
      res.json({
        code: status.success,
        data: data,
        message: "success",
      });
    })
    .catch(() => {
      res.status(status.serverError);
    });
});
module.exports = router;
