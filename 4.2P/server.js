const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const AlbumSchema = new mongoose.Schema({
  album: String,
  artist: String,
  year: String,
  album_cover_url : String
});

const Album = mongoose.model('album', AlbumSchema);

mongoose.connect('mongodb://127.0.0.1:27017/albums', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/albums', async (req, res)=>{
  const albums = await Album.find()
  res.json({albums : albums})
})

app.post('/albums', async (req, res)=>{
  const {album, artist, year, albumCover} = req.body
  await Album.insertMany([{album: album, artist: artist, year: year, album_cover_url: albumCover}])
  res.redirect('/')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})