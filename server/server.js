var express = require("express");
var router = require("./routes/routes.js");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

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
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

db.once("open", function (callback) {
  console.log("Connection Successfull");
});

app.use("/", router);

module.exports = app;
