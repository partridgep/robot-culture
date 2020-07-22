const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageLandscape: String,
  imagePortrait: String,
  movies: [String],
  books: [String],
  games: [String],
  height: Number,
  length: Number,
  width: Number,
  actors: [String],
  categories: [String],
  approved: Boolean
}, {
  timestamps: true
});

module.exports = mongoose.model('Robot', robotSchema);