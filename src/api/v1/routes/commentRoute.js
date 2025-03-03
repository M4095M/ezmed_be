const route = require('express').Router();

const {getAllHandler,getByIdHandler,postHandler,putHandler,deleteHandler} = require('../controllers/commentController.js');

route.get('/', getAllHandler);
route.get('/:id', getByIdHandler);
route.post('/', postHandler);
route.put('/:id', putHandler);
route.delete('/:id', deleteHandler);

module.exports = route;