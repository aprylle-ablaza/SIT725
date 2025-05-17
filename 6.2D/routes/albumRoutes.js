const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.post('/', albumController.addAlbum);
router.get('/:id', albumController.getAlbum);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);
router.get('/', albumController.getAllAlbums);

module.exports = router;

router.delete('/:id', )