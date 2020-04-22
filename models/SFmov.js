const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SFmovSchema = new Schema({
  title: String,
  release_year: String,
  locations: String,
  fun_facts: String,
  production_company: String,
  distrubuter: String,
  director: String,
  writer: String,
  actor_1: String,
  actor_2: String,
  actor_3: String,
});

module.exports = mongoose.model("SFMov", SFmovSchema, "sfmovies");
