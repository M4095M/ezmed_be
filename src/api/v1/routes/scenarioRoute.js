const route = require('express').Router();
const {getAllHandler, getOneHandler, createHandler,createContentHandler, updateHandler, deleteHandler} = require('../controllers/scenarioController.js');
const upload = require('../../../config/storage.js');

route.get('/', getAllHandler);
route.get('/:id', getOneHandler);
route.post('/',upload.single('image'), createHandler);
route.post('/:id', createContentHandler);
route.put('/:id',upload.single('image'), updateHandler);
route.delete('/:id', deleteHandler);

module.exports = route;