const Album = require("../models/album");
const path = require('path')

exports.getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.json({ albums: albums });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching albums." });
    }
};

exports.addAlbum = async (req, res) => {
    try {
        const { album, artist, year, albumCover } = req.body;
        if (!album || !artist || !year || !albumCover) {
            return res.status(400).json({ message: "All album fields are required." });
        }

        await Album.insertMany([{ album, artist, year, album_cover_url: albumCover }]);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: "An error occurred while adding the album." });
    }
};

exports.getAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({ message: "Album not found." });
        }

        res.json({ album: album });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the album." });
    }
};

exports.updateAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const { album, artist, year, albumCover } = req.body;

        const updatedData = {
            album: album,
            artist: artist,
            year: year,
            album_cover_url: albumCover
        };

        const updatedAlbum = await Album.findByIdAndUpdate(albumId, updatedData, { new: true });

        if (!updatedAlbum) {
            return res.status(404).json({ message: "Album not found" });
        }
        res.json({ message: "Album updated successfully", album: updatedAlbum });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAlbum = async (req, res) => {
    try {
        const albumId = req.params.id;
        const deletedAlbum = await Album.findByIdAndDelete(albumId);
        if (!deletedAlbum) {
            return res.status(404).json({ message: "Album not found" });
        }
        res.json({ message: "Album deleted successfully", album: deletedAlbum });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};