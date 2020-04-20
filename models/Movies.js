var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MoviesSchema = new Schema({
  title: String,
});

module.exports = mongoose.model("Movies", MoviesSchema, "movies");
