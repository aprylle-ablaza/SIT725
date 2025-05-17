const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Album = require('../models/album');

let expect;

describe('GET /albums', () => {
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

    beforeEach(async ()=>{
        await Album.deleteMany({});
    });

    it('should return empty array if no albums', async () =>{
        const res = await request(app).get('/albums');
        expect(res.status).to.equal(200);
        expect(res.body.albums).to.be.an("array").that.is.empty;
    });

    it('should return all albums', async () => {
        await Album.create({ album: "A", artist: "B", year: 2020, album_cover_url: "url" });
        const res = await request(app).get("/albums");
        expect(res.status).to.equal(200);
        expect(res.body.albums).to.have.lengthOf(1);
    });

    it("should return albums as objects", async () => {
      await Album.create({ album: "A", artist: "B", year: 2020, album_cover_url: "url" });
      const res = await request(app).get("/albums");
      expect(res.body.albums[0]).to.include.keys("album", "artist", "year", "album_cover_url");
    });

    it("should return 500 on DB error", async () => {
      await mongoose.disconnect();
      const res = await request(app).get("/albums");
      expect(res.status).to.equal(500);
      await mongoose.connect("mongodb://127.0.0.1:27017/album-test");
    });
});

describe("GET /albums/:id", () => {
    let album;
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

    beforeEach(async ()=>{
        await Album.deleteMany({});
        album = await Album.create({ album: "GetOne", artist: "Art", year: 2005, album_cover_url: "url" });
    });
    
    it("should return the album by ID", async () => {
      const res = await request(app).get(`/albums/${album._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.album.album).to.equal("GetOne");
    });
    
    it("should return 404 if album not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/albums/${fakeId}`);
      expect(res.status).to.equal(404);
    });
    
    it("should return 500 for invalid ID", async () => {
      const res = await request(app).get("/albums/invalid-id");
      expect(res.status).to.equal(500);
    });
});

describe('POST /albums', () => {
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

    beforeEach(async ()=>{
        await Album.deleteMany({});
    });

    it('should create a new album', async () => {
        const albumData = {
            album: 'Test Album',
            artist: 'Test Artist',
            year: '2022',
            albumCover: 'http://example.com/cover.jpg'
        };

        const res = await request(app).post('/albums').send(albumData).expect(302);
        
        const album = await Album.findOne({ album: 'Test Album' });
        expect(album).to.not.be.null;
        expect(album.artist).to.equal('Test Artist');
    });

    it("should return 400 if missing fields", async () => {
      const res = await request(app).post("/albums").send({ album: "Only title" });
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("All album fields are required.");
    });

    it("should redirect to home page after successful request", async () => {
      const res = await request(app).post("/albums").send({
        album: "New",
        artist: "Artist",
        year: 2022,
        albumCover: "url",
      });
      expect(res.headers.location).to.equal('/')
    })
    
    it("should return 500 on DB error", async () => {
      await mongoose.disconnect();
      const res = await request(app).post("/albums").send({
        album: "New",
        artist: "Artist",
        year: 2022,
        albumCover: "url",
      });
      expect(res.status).to.equal(500);
      await mongoose.connect("mongodb://127.0.0.1:27017/album-test");
    });
});

describe('PUT /albums/:id', () => {
    let album;
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

    beforeEach(async ()=>{
        await Album.deleteMany({});
        album = await Album.create({ album: "Old", artist: "Art", year: 2005, album_cover_url: "url" });
    });

    it("should update the album", async () => {
      const res = await request(app).put(`/albums/${album._id}`).send({
        album: "New",
        artist: "New Artist",
        year: 2023,
        albumCover: "newurl",
      });
      expect(res.status).to.equal(200);
      expect(res.body.album.album).to.equal("New");
    });

    it("should return 404 if album not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).put(`/albums/${fakeId}`).send({
        album: "None",
        artist: "None",
        year: 2000,
        albumCover: "none",
      });
      expect(res.status).to.equal(404);
    });

    it("should return 500 for invalid ID", async () => {
      const res = await request(app).put("/albums/invalid-id").send({});
      expect(res.status).to.equal(500);
    });

    it("should keep fields unchanged if not updated", async () => {
      const beforeUpdate = await request(app).get(`/albums/${album._id}`);
      const res = await request(app).put(`/albums/${album._id}`).send({});
      expect(res.status).to.equal(200);
      const afterUpdate = await request(app).get(`/albums/${album._id}`);
      expect(beforeUpdate.body.album.album).to.equal(afterUpdate.body.album.album);
      expect(beforeUpdate.body.album.artist).to.equal(afterUpdate.body.album.artist);
      expect(beforeUpdate.body.album.year).to.equal(afterUpdate.body.album.year);
      expect(beforeUpdate.body.album.album_cover_url).to.equal(afterUpdate.body.album.album_cover_url);
    });
});

describe("DELETE /albums/:id", () => {
    let album;
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

    beforeEach(async ()=>{
        await Album.deleteMany({});
        album = await Album.create({ album: "GetOne", artist: "Art", year: 2005, album_cover_url: "url" });
    });
    
    it("should delete the album", async () => {
      const res = await request(app).delete(`/albums/${album._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.include("deleted");
    });
    
    it("should return 404 if album not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/albums/${fakeId}`);
      expect(res.status).to.equal(404);
    });
    
    it("should return 500 for invalid ID", async () => {
      const res = await request(app).delete("/albums/invalid-id");
      expect(res.status).to.equal(500);
    });
    
    it("should no longer find album in DB", async () => {
      await request(app).delete(`/albums/${album._id}`);
      const found = await Album.findById(album._id);
      expect(found).to.be.null;
    });
});