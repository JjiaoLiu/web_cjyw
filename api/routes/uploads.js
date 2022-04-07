const { Router } = require("express");
import { filePath } from "./../index";
const router = Router();
import * as status from "./../statusCode";
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, filePath); //fullpath
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload_storage = multer({ storage: storage });
router.post("/upload", upload_storage.single("file"), function (req, res) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.json({
    code: status.success,
    data: "http://localhost:3000/uploads/" + req.file.originalname,
    message: "success",
  });
});
router.get("/picture", function (_req, res) {
  res.json({
    code: status.success,
    data: ["/uploads/1.jpg", "/uploads/2.jpg", "/uploads/3.jpg"],
    message: "success",
  });
});

module.exports = router;
