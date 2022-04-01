const { Router } = require("express");
import { ObjectId } from "mongodb";
import * as status from "./../statusCode";
const router = Router();
router.get("/news/list", async (req, res) => {
  var dbo = global.mongodb.db("g1");
  var key = req.query.key;
  var limit = Number(req.query.limit) || 2;
  var page = Number(req.query.page) || 1;
  var skip = limit * (page - 1);
  var reg = new RegExp(key, "gi");
  var collection = dbo.collection("news");
  try {
    let count = await collection
      .aggregate([{ $match: { title: reg } }, { $count: "total" }])
      .toArray();
    let data = await collection
      .aggregate([
        { $match: { title: reg } },
        { $skip: skip },
        { $limit: limit },
        { $project: { id: "$_id", _id: 0, title: 1 } },
      ])
      .toArray();
    res.json({
      code: status.success,
      data: {
        total: count[0].total,
        data: data,
      },
      message: "success",
    });
  } catch {
    res.status(status.serverError);
  }
});
router.put("/news/put", function (req, res) {
  let _id = req.body.id;
  var dbo = global.mongodb.db("g1");
  dbo
    .collection("news")
    .findOneAndUpdate(
      { _id: ObjectId(_id) },
      { $set: { title: req.body.title } }
    )
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
