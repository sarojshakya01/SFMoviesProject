var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SFmoviesSchema = new Schema({
  title: String,
  release_year: String,
  locations: String,
  lat_lon: String,
  fun_facts: String,
  production_company: String,
  distrubuter: String,
  director: String,
  writer: String,
  actor_1: String,
  actor_2: String,
  actor_3: String,
});

module.exports = mongoose.model("SFMovies", SFmoviesSchema, "sfmoviesfinal");
