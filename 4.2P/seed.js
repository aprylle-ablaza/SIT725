const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/albums', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const AlbumSchema = new mongoose.Schema({
  album: String,
  artist: String,
  year: String,
  album_cover_url : String
});

const Album = mongoose.model('album', AlbumSchema);

const albums = [
  {
    "album": "Midnights",
    "artist": "Taylor Swift",
    "year": 2024,
    "recommended_song": "Anti-Hero",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png"
  },
  {
    "album": "Harry's House",
    "artist": "Harry Styles",
    "year": 2023,
    "recommended_song": "As It Was",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/d/d5/Harry_Styles_-_Harry%27s_House.png"
  },
  {
    "album": "We Are",
    "artist": "Jon Batiste",
    "year": 2022,
    "recommended_song": "Freedom",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/f/f9/Jon_Batiste_-_We_Are.png"
  },
  {
    "album": "Folklore",
    "artist": "Taylor Swift",
    "year": 2021,
    "recommended_song": "Cardigan",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png"
  },
  {
    "album": "When We All Fall Asleep, Where Do We Go?",
    "artist": "Billie Eilish",
    "year": 2020,
    "recommended_song": "Bad Guy",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png"
  },
  {
    "album": "SOS",
    "artist": "SZA",
    "year": 2024,
    "recommended_song": "Kill Bill",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/2/2c/SZA_-_S.O.S.png"
  },
  {
    "album": "Endless Summer Vacation",
    "artist": "Miley Cyrus",
    "year": 2024,
    "recommended_song": "Flowers",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/5/54/Miley_Cyrus_-_Endless_Summer_Vacation.png"
  },
  {
    "album": "World Music Radio",
    "artist": "Jon Batiste",
    "year": 2024,
    "recommended_song": "Worship",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/b/b7/Jon_Batiste_-_World_Music_Radio.png"
  },
  {
    "album": "Guts",
    "artist": "Olivia Rodrigo",
    "year": 2024,
    "recommended_song": "Vampire",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/0/03/Olivia_Rodrigo_-_Guts.png"
  },
  {
    "album": "The Record",
    "artist": "Boygenius",
    "year": 2024,
    "recommended_song": "Not Strong Enough",
    "album_cover_url": "https://upload.wikimedia.org/wikipedia/en/2/21/Boygenius_-_the_record.jpg"
  }
]

Album.insertMany(albums)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));