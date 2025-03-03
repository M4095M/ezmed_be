const createError = require('http-errors');
const { createProposition, findPropositionById, updateProposition, deleteProposition } = require('../services/propositionService.js');

const getByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const proposition = await findPropositionById(parseInt(id));
        return res.status(200).json({
            success: 200,
            message: 'Successfully retrieved proposition.',
            data: proposition
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const postHandler = async (req, res, next) => {
    try {
        const { questionId, content, correct, alternative } = req.body;
        const proposition = await createProposition({ questionId: parseInt(questionId), content, correct, alternative });
        return res.status(201).json({
            success: 201,
            message: 'Successfully created proposition.',
            data: proposition
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const putHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { questionId, content, correct, alternative } = req.body;
        const proposition = await updateProposition(parseInt(id), { questionId: parseInt(questionId), content, correct, alternative });
        return res.status(200).json({
            success: 200,
            message: 'Successfully updated proposition.',
            data: proposition
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const proposition = await deleteProposition(parseInt(id));
        return res.status(200).json({
            success: 200,
            message: 'Successfully deleted proposition.',
            data: proposition
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

module.exports = {
    getByIdHandler,
    postHandler,
    putHandler,
    deleteHandler
}
