const { Router } = require("express");
const router = Router();
import * as status from "./../statusCode";
router.post("/upload", function (req, res) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.json({
    code: status.success,
    data: req.file.originalname,
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
