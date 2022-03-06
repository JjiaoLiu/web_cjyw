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
app.use((err, _req, res, _next) => {
  console.log("error----------------------------");
  console.log(err.name);
  if (err.name == "UnauthorizedError") {
    return res.send({ statusCode: 401, message: "Invalid Token" });
  }
  res.send({ status: 500, message: "Unknown Error" });
});
// Require API routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const news = require("./routes/news");

// Import API Routes
app.use(users);
app.use(auth);
app.use(news);

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
