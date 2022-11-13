import { MongoClient } from "mongodb";
// Connect mongodb
var url = "mongodb://localhost:27017/";
export var filePath = "/Users/g1/workSpace/web_cjyw/static/uploads";
async function connectMongoClient() {
  if (!global.mongodb) global.mongodb = await MongoClient.connect(url);
}
connectMongoClient();

const express = require("express");
// Create express instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT
const expressJWT = require("express-jwt");
const secretKey = "web_cjyw";
app.use(
  expressJWT({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: ["/api/auth/login"],
  })
);
app.use("*", function (req, res, next) {
  console.log(1);
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
    res.status(401).json({ code: "401", message: err.name });
  }
  res.status(500).json({ code: "500", message: err.name });
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
