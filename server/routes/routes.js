const express = require("express");
const router = express.Router();
const SFMovies = require("../../models/SFMovies");
const SFMov = require("../../models/SFMov");
const Movies = require("../../models/Movies");
const SFMoviesDetail = require("../../models/SFMoviesDetail");

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/movies", function (req, res) {
  const title = req.query.title;
  if (title != "" && title != undefined) {
    SFMoviesDetail.find({ title: title }, { _id: 0 }, function (err, movies) {
      res.send(movies);
    });
  } else {
    SFMoviesDetail.find({}, { _id: 0 }, function (err, movies) {
      res.send(movies);
    });
  }
});

router.get("/mergeNCreate", function (req, res) {
  SFMov.aggregate([
    {
      $lookup: {
        from: "latlon",
        localField: "locations",
        foreignField: "locations",
        as: "fromlatlon",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$fromlatlon", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { fromlatlon: 0 } },
    { $out: "sfmoviesfinal" },
  ]).exec((err, result) => {
    if (err) throw err;
    console.log("New collection sfmoviesfinal created!");
    res.send("New collection sfmoviesfinal created!");
  });
});

router.get("/mergeFinal", function (req, res) {
  Movies.aggregate([
    {
      $lookup: {
        from: SFMovies.collection.name,
        localField: "title",
        foreignField: "title",
        as: "description",
      },
    },
    {
      $project: {
        _id: 0,
        description: { title: 0, _id: 0 },
      },
    },
    { $out: "sfmoviesdetail" },
  ]).exec((err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("New collection sfmoviesdetail created!");
    res.send("New collection sfmoviesdetail created!");
  });
});

router.get("/maps", function (req, res) {
  const movie = req.query.movie;
  SFMovies.find({ title: movie }, { _id: 0, title: 1, actor_1: 1 }, function (
    err,
    movies
  ) {
    if (err) res.send(err);
    // res.json(movies);
    console.log(movies);
  });
});

module.exports = router;
