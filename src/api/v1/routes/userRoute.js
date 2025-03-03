const route = require('express').Router();
const { getAllHandler, getOneHandler, getAllPaymentHandler, banHandler, updateHandler } = require('../controllers/userController.js');
const { inSession, isAuth, isAdmin } = require('../middlewares/authMiddleware.js');

route.get('/', isAuth, isAdmin, getAllHandler);
route.get('/pay',isAuth,isAdmin, getAllPaymentHandler)
route.get('/:id',isAuth,isAdmin, getOneHandler);
route.put('/', inSession, isAuth, updateHandler);
route.put('/:id/ban',isAuth,isAdmin, banHandler);


module.exports = route;

