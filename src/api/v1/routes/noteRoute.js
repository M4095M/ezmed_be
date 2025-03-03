const route = require('express').Router();

const {getAllHandler,getByIdHandler,postHandler,putHandler,deleteHandler,getAllByQuestionHandler} = require('../controllers/noteController.js');

route.get('/', getAllHandler);
route.get('/question/:questionId', getAllByQuestionHandler);
route.get('/:id', getByIdHandler);
route.post('/', postHandler);
route.put('/:id', putHandler);
route.delete('/:id', deleteHandler);

module.exports = route;