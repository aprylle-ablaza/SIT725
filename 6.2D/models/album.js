const mongoose = require('../db');

const AlbumSchema = new mongoose.Schema({
  album: String,
  artist: String,
  year: String,
  album_cover_url : String
});

const Album = mongoose.model('album', AlbumSchema);

module.exports = Album;