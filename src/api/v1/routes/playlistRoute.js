const route = require('express').Router();
const upload = require('../../../config/storage.js');
const { getAllHandler, getOneHandler, createHandler, fetchHandler, createContentHandler, updateContentHandler, updateHandler, deleteHandler, deleteContentHandler } = require('../controllers/playlistController.js');

route.get('/', getAllHandler);
route.get('/:id', getOneHandler);
route.post('/', upload.single('image'), createHandler);
route.post('/fetch', fetchHandler)
route.post('/content', createContentHandler);
route.put('/:id', updateHandler);
route.put('/:id/:contentId', updateContentHandler);
route.delete('/:id', deleteHandler);
route.delete('/:id/:contentId', deleteContentHandler);

module.exports = route;