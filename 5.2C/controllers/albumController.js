const Album = require("../models/album");
const path = require('path')
exports.getAllAlbums = async (req, res) => {
    const albums = await Album.find()
    res.json ({albums : albums});
}

exports.addAlbum = async (req, res) => {
    const {album, artist, year, albumCover} = albumInfo
    await Album.insertMany([{album: album, artist: artist, year: year, album_cover_url: albumCover}])
    res.redirect('/')
}

exports.getAlbum = async (req, res) => {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);
    res.json ({album: album});
}
