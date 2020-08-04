const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  title: String,
  link: String,
  releaseYear: String
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
  favoritedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  imageLandscape: String,
  imagePortrait: String,
  movies: [mediaSchema],
  books: [mediaSchema],
  games: [mediaSchema],
  tvShows: [mediaSchema],
  height: heightSchema,
  manufacturer: String,
  actors: [actorSchema],
  categories: [String],
  approved: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model('Robot', robotSchema);