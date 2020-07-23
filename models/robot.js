const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  link: String,
  releaseYear: Number
});

const bookSchema = new Schema({
  title: String,
  link: String,
  publicationYear: Number
});

const gameSchema = new Schema({
  title: String,
  link: String,
  releaseYear: Number
});

const tvShowSchema = new Schema({
  title: String,
  link: String,
  releaseYear: Number
});

const actorSchema = new Schema({
  name: String,
  link: String
});

const heightSchema = new Schema({
  feet: Number,
  inches: Number
});

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageLandscape: String,
  imagePortrait: String,
  movies: [movieSchema],
  books: [bookSchema],
  games: [gameSchema],
  tvShows: [tvShowSchema],
  height: heightSchema,
  manufacturer: String,
  actors: [actorSchema],
  categories: [String],
  approved: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model('Robot', robotSchema);