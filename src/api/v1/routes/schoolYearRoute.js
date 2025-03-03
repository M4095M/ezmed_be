const route = require('express').Router();
const { getAllHandler, getByIdHandler,getAllUserHandler, postHandler, putHandler, deleteHandler } = require('../controllers/schoolYearController.js');
const { inSession, isAuth, isAdmin } = require('../middlewares/authMiddleware.js');

route.get('/', getAllHandler);
route.get('/user',inSession,isAuth, getAllUserHandler);
route.get('/:id',isAuth,isAdmin, getByIdHandler);
route.post('/',isAuth,isAdmin, postHandler);
route.put('/:id',isAuth,isAdmin, putHandler);
route.delete('/:id',isAuth,isAdmin, deleteHandler);

module.exports = route;