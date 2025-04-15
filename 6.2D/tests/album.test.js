const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Album = require('../models/album');

let expect;

describe('Test Cases for Album Endpoints', () => {
    let albumId;

    before(async () => {
        const chai = await import('chai');
        expect = chai.expect;
        await mongoose.disconnect();
        await mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async () => {
        await Album.deleteMany({});
        await mongoose.connection.close();
    });

    it('should create a new album', async () => {
        const albumData = {
            album: 'Test Album',
            artist: 'Test Artist',
            year: '2022',
            albumCover: 'http://example.com/cover.jpg'
        };

        const res = await request(app)
            .post('/albums')
            .send(albumData)
            .expect(302);

        const album = await Album.findOne({ album: 'Test Album' });
        expect(album).to.not.be.null;
        expect(album.artist).to.equal('Test Artist');
        albumId = album._id.toString();
    });

    it('should get all albums', async () => {
        const res = await request(app)
            .get('/albums')
            .expect(200);

        expect(res.body.albums).to.be.an('array');
        expect(res.body.albums.length).to.be.greaterThan(0);
    });

    it('should get a single album by id', async () => {
        const res = await request(app)
            .get(`/albums/${albumId}`)
            .expect(200);

        expect(res.body.album).to.not.be.null;
        expect(res.body.album._id).to.equal(albumId);
    });

    it('should update an album by id', async () => {
        const updatedData = {
            album: 'Updated Album',
            artist: 'Updated Artist',
            year: '2023',
            albumCover: 'http://example.com/updated_cover.jpg'
        };

        const res = await request(app)
            .put(`/albums/${albumId}`)
            .send(updatedData)
            .expect(200);

        const updatedAlbum = await Album.findById(albumId);
        expect(updatedAlbum.album).to.equal('Updated Album');
        expect(updatedAlbum.artist).to.equal('Updated Artist');
        expect(updatedAlbum.year).to.equal('2023');
    });

    it('should delete an album by id', async () => {
        const res = await request(app)
            .delete(`/albums/${albumId}`)
            .expect(200);

        const deletedAlbum = await Album.findById(albumId);
        expect(deletedAlbum).to.be.null;
    });
});
