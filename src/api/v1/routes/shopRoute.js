const route = require('express').Router();
const {getAllHandler, getByIdHandler, postHandler, updateHandler, deleteHandler } = require('../controllers/shopController.js');
const { isAdmin, isAuth } = require('../middlewares/authMiddleware.js');

route.get('/', getAllHandler);
route.get('/:id', getByIdHandler);
route.post('/',isAuth,isAdmin, postHandler);
route.put('/:id',isAuth,isAdmin, updateHandler);
route.delete('/:id',isAuth,isAdmin, deleteHandler);

module.exports = route;
