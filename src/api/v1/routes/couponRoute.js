const route = require('express').Router();

const {getAllHandler, getByIdHandler, postHandler,postCheckHandler, updateHandler, deleteHandler} = require('../controllers/couponController.js');
const { inSession, isAuth, isAdmin } = require('../middlewares/authMiddleware.js');

route.get('/',isAuth,isAdmin, getAllHandler);
route.get('/:id',isAuth,isAdmin, getByIdHandler);
route.post('/',isAuth,isAdmin, postHandler);
route.post('/check',inSession,isAuth, postCheckHandler);
route.put('/:id',isAuth,isAdmin, updateHandler);
route.delete('/:id',isAuth,isAdmin, deleteHandler);

module.exports = route;