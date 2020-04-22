const express = require("express");
const router = require("./routes/routes.js");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client"));

app.use(express.static(path.join(__dirname, "../client")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

var uri = "mongodb://127.0.0.1:27017/SFData";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

// used as alternative of mangoose for testing purpose
// const MongoClient = require("mongodb").MongoClient;
// MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("SFData");
//   dbo
//     .collection("sfmovies")
//     .aggregate([
//       {
//         $lookup: {
//           from: "latlon",
//           localField: "locations",
//           foreignField: "locations",
//           as: "des",
//         },
//       },
//     ])
//     .limit(1)
//     .toArray((err, res) => {
//       if (err) throw err;
//       console.log(res[0]);
//       db.close();
//     });
// });

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(
    console,
    "Database Connection Error at 127.0.0.1:27017/SFData"
  )
);

db.once("open", function (callback) {
  console.log(
    "Database 'SFDtata' Connected Successfully at 127.0.0.1:27017/SFData"
  );
});

app.use("/", router);

module.exports = app;
