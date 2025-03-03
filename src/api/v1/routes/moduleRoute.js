const route = require('express').Router();
const { getAllHandler, getByIdHandler, postHandler, putHandler, deleteHandler } = require('../controllers/moduleController.js');
const upload = require('../../../config/storage.js');

route.get('/', getAllHandler);
route.get('/:id', getByIdHandler);
route.post('/', upload.single('image'), postHandler);
route.put('/:id', upload.single('image'), putHandler);
route.delete('/:id', deleteHandler);

module.exports = route;