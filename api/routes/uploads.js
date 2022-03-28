const { Router } = require("express");
const router = Router();
import * as status from "./../statusCode";
router.post("/upload", function (req, res) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.json({
    code: status.success,
    data: req.file.originalname,
  });
});
module.exports = router;
