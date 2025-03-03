const router = require('express').Router();
const {
    getAllHandler,
    getByIdHandler,
    createHandler,
    updateHandler,
    deleteHandler
} = require('../controllers/questionController.js');
const upload = require('../../../config/storage.js');


router.get('/', getAllHandler);
router.get('/:id', getByIdHandler);
router.post('/',upload.single('image'), createHandler);
router.put('/:id',upload.single('image'), updateHandler);
router.delete('/:id', deleteHandler);

module.exports = router;