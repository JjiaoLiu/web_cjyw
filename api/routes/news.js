const { Router } = require("express");
import { ObjectId } from "mongodb";
import * as status from "./../statusCode";
const router = Router();

router.get("/news/list", async (req, res) => {
  var dbo = global.mongodb.db("g1");
  var collection = dbo.collection("news");
  var key = req.query.key;
  var limit = Number(req.query.limit) || 10;
  var page = Number(req.query.page) || 1;
  var skip = limit * (page - 1);
  var reg = new RegExp(key, "gi");
  try {
    let allMatched = await collection
      .aggregate([
        { $match: { title: reg } },
        { $project: { id: "$_id", _id: 0, title: 1 } },
      ])
      .toArray();
    let count = allMatched.length;
    let data = allMatched.slice(skip, skip + limit);
    res.json({
      code: status.success,
      data: {
        total: count,
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
const formidable = require("formidable");
router.post("/news/import", function (req, res) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  const form = new formidable.IncomingForm();
  form.parse(req, (_err, _fields, files) => {
    const f = Object.entries(files)[0][1];
    const path = f.filepath;
    const workbook = XLSX.readFile(path);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsa = XLSX.utils.sheet_to_json(worksheet);
    var dbo = global.mongodb.db("g1");
    dbo
      .collection("news")
      .insertMany(jsa)
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
  res.json({
    code: status.success,
    message: "success",
  });
});
var XLSX = require("xlsx");
router.get("/news/export", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", req.headers.origin);
  var dbo = global.mongodb.db("g1");
  var collection = dbo.collection("news");
  var key = req.query.key;
  var reg = new RegExp(key, "gi");
  try {
    let allMatched = await collection
      .aggregate([
        { $match: { title: reg } },
        { $project: { id: "$_id", _id: 0, title: 1 } },
      ])
      .toArray();
    res.setHeader("Content-Type", "application/octet-stream");
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(allMatched);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    var wbout = XLSX.write(wb, {
      bookType: "xlsx",
      bookSST: true,
      type: "buffer",
    });
    res.send(wbout);
  } catch {
    res.status(status.serverError);
  }
});
module.exports = router;
