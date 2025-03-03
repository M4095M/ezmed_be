const createError = require('http-errors');
const { createQuestion, findQuestionById, updateQuestion, deleteQuestion } = require('../services/questionService.js');
const { createPropositions,deletePropositions } = require('../services/propositionService.js');
const {uploadFile,deleteFile} = require('../helpers/uploadFile.js');

const getAllHandler = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: 200,
            message: 'Not implemented Yet!.',
            data: []
        });
    } catch (error) {
        next(createError(500, error.message));
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await findQuestionById(parseInt(id));
        return res.status(200).json({
            success: 200,
            message: 'Successfully retrieved question.',
            data: result
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const createHandler = async (req, res, next) => {
    try {
        const { propositions, content, explication = "", year, title, courseId = null, scenarioId = null } = req.body;
        const file = req.file;
        const image = file? await uploadFile(file): null;
        const question = await createQuestion({ content, explication, year, title, courseId:courseId?parseInt(courseId):null, scenarioId:scenarioId?parseInt(scenarioId):null,image });
        const propositionData = JSON.parse(propositions).map((proposition) => ({
            questionId: question.id,
            ...proposition
        }));
        await createPropositions(propositionData);
        const result = await findQuestionById(question.id);
        return res.status(201).json({
            success: 201,
            message: 'Successfully created question.',
            data: result
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const updateHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const file = req.file;
        const { propositions, content, explication, year, title, courseId = null, scenarioId = null} = req.body;
        let image = req.body.image;
        if(file){
            if(image){
                await deleteFile(image);
            }
            image = await uploadFile(file);
        }
        const question = await updateQuestion(parseInt(id), { content, explication, year, title, courseId:courseId?parseInt(courseId):null, scenarioId:scenarioId?parseInt(scenarioId):null,image });
        await deletePropositions(parseInt(id));
        const propositionData = JSON.parse(propositions).map((proposition) => ({
            questionId: question.id,
            ...proposition
        }));
        await createPropositions(propositionData);
        const result = await findQuestionById(question.id);
        return res.status(200).json({
            success: 200,
            message: 'Successfully updated question.',
            data: result
        });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        next(createError(400, error.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteQuestion(parseInt(id));
        await deleteFile(result.image);
        return res.status(200).json({
            success: 200,
            message: 'Successfully deleted question.',
            data: result
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

module.exports = {
    getAllHandler,
    getByIdHandler,
    createHandler,
    updateHandler,
    deleteHandler
}