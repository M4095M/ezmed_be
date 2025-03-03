const createError = require('http-errors');
const {findAll, findById, create, update, remove} = require('../services/shopService.js');

const getAllHandler = async (req, res, next) => {
    try {
        const shops = await findAll();
        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all shops',
            data: shops
        })   
    } catch (error) {
        next(createError(500, error.message));
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const shop = await findById(parseInt(id));
        res.status(200).json({
            status: 200,
            message: `Successfully retrieved shop with id ${id}`,
            data: shop
        })
    } catch (error) {
        next(createError(400, error.message));
    }
}

const postHandler = async (req, res, next) => {
    try {
        const {name,location}=req.body;
        const shop = await create({name,location});
        res.status(201).json({
            status: 201,
            message: 'Successfully created a new shop.',
            data: shop
        });
        
    } catch (error) {
        next(createError(400, error.message));
    }
}

const updateHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name,location}=req.body;
        const shop = await update(parseInt(id),{name,location});
        res.status(200).json({
            status: 200,
            message: `Successfully updated shop with id ${id}`,
            data: shop
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const shop = await remove(parseInt(id));
        res.status(200).json({
            status: 200,
            message: `Successfully deleted shop with id ${id}`,
            data: shop
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

module.exports = {
    getAllHandler,
    getByIdHandler,
    postHandler,
    updateHandler,
    deleteHandler
}