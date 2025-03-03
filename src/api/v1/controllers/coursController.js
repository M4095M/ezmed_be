const createError = require('http-errors');
const { findAllCours, findCoursById, createCours, updateCours, deleteCours } = require('../services/coursService.js');

const getAllHandler = async (req, res, next) => {
    try {
        const cours = await findAllCours();
        res.status(200).json({
            success: 200,
            message: 'Successfully fetched all cours.',
            data: cours
        });
    } catch (err) {
        next(createError(500, err.message))
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cours = await findCoursById(parseInt(id));
        res.status(200).json({
            success: 200,
            message: 'Successfully fetched cours by id.',
            data: cours
        });
    } catch (err) {
        next(createError(400, err.message))
    }
}

const postHandler = async (req, res, next) => {
    try {
        const { title, moduleId, type } = req.body;
        const cours = await createCours({ title, type, moduleId: parseInt(moduleId) });
        res.status(201).json({
            success: 201,
            message: 'Successfully created a new cours.',
            data: cours
        });
    } catch (err) {
        next(createError(400, err.message))
    }
}

const putHandler = async (req, res, next) => {
    try {
        const { title } = req.body;
        const { id } = req.params;
        const cours = await updateCours({ title }, parseInt(id));
        res.status(200).json({
            success: 200,
            message: 'Successfully updated cours by id.',
            data: cours
        });
    } catch (err) {
        next(createError(400, err.message))
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cours = await deleteCours(parseInt(id));
        res.status(200).json({
            success: 200,
            message: 'Successfully deleted cours by id.',
            data: cours
        });
    } catch (err) {
        next(createError(400, err.message))
    }
}

module.exports = {
    getAllHandler,
    getByIdHandler,
    postHandler,
    putHandler,
    deleteHandler
}