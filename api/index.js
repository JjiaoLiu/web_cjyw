import { MongoClient } from "mongodb";
// Connect mongodb
var url = "mongodb://localhost:27017/";
async function connectMongoClient() {
  if (!global.mongodb) global.mongodb = await MongoClient.connect(url);
}
connectMongoClient();

const express = require("express");
// Create express instance
const app = express();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "/Users/g1/workSpace/web_cjyw/uploads"); //fullpath
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(upload.single("file"));
app.use(express.urlencoded({ extended: false }));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// JWT
const expressJWT = require("express-jwt");
const secretKey = "web_cjyw";
app.use(
  expressJWT({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: ["/api/auth/login"],
  })
);
app.use("*", function (req, res, next) {
  if (req.method.toLowerCase() == "options") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Accept, Accept-Language, Content-Language, Content-Type, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,OPTIONS,HEAD"
    );
    res.sendStatus(200);
  } else {
    next();
  }
});

// Require API routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const news = require("./routes/news");
const uploads = require("./routes/uploads");

// Import API Routes
app.use(users);
app.use(auth);
app.use(news);
app.use(uploads);

app.use((err, _req, res, _next) => {
  res.header("Access-Control-Allow-Origin", _req.headers.origin);
  if (err.name == "UnauthorizedError") {
    console.log(err.name);
    return res.status(401).json({ code: "000", data: err.name });
  }
  return res.status(500).json({ code: "000", data: err.name });
});
// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
