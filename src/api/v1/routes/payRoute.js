const route = require('express').Router();
const upload = require('../../../config/storage.js');
const {getAllHandler,getCurrentHandler,getByIdHandler,validateHandler,createHandler,updateHandler,deleteHandler} = require('../controllers/payController.js');
const { inSession, isAuth, isAdmin } = require('../middlewares/authMiddleware.js');

//route.get('/',getAllHandler)
route.get('/current',isAuth,isAdmin,getCurrentHandler)
//route.get('/:id',getByIdHandler)
route.post('/',inSession,isAuth,upload.single('image'),createHandler)
route.post('/:id',isAuth,isAdmin,validateHandler)
//route.put('/:id',updateHandler)
//route.delete('/:id',deleteHandler)

module.exports = route;