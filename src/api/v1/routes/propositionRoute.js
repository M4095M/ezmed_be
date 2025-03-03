const route = require('express').Router();
const {
    getByIdHandler,
    postHandler,
    putHandler,
    deleteHandler
} = require('../controllers/propositionController.js');

route.get('/:id',getByIdHandler)
route.post('/',postHandler)
route.put('/:id',putHandler)
route.delete('/:id',deleteHandler)

module.exports = route;
