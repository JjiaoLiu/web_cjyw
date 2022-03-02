import { MongoClient } from "mongodb";
// Connect mongodb
var url = "mongodb://localhost:27017/";
async function connectMongoClient() {
  if (!global.mongodb) global.mongodb = await MongoClient.connect(url);
}
connectMongoClient();

const express = require("express");
const bodyParser = require("body-parser");
// Create express instance
const app = express();
app.use(bodyParser.json());

// Require API routes
const users = require("./routes/users");
const auth = require("./routes/auth");

// Import API Routes
app.use(users);
app.use(auth);

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
