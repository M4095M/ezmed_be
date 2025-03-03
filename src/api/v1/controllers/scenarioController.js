const createError = require('http-errors');
const { findAllScenarios, findScenarioById, createScenario, createContent, updateScenario, deleteScenario } = require('../services/scenarioService.js');
const {uploadFile,deleteFile} = require('../helpers/uploadFile.js');

const getAllHandler = async (req, res, next) => {
    try {
        const scenarios = await findAllScenarios();
        return res.status(200).json({
            success: 200,
            message: 'Successfully fetched all scenarios.',
            data: scenarios
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

const getOneHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const scenario = await findScenarioById(parseInt(id));
        return res.status(200).json({
            success: 200,
            message: 'Successfully fetched scenario by id.',
            data: scenario
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const createHandler = async (req, res, next) => {
    try {
        const { title, courseId, year, description } = req.body;
        const file = req.file;
        const image = file ? await uploadFile(file) : null;
        const scenario = await createScenario({ title, courseId:parseInt(courseId), year, description, image });
        return res.status(201).json({
            success: 201,
            message: 'Successfully created scenario.',
            data: scenario
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const createContentHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { questions } = req.body;
        const scenario = await createContent(parseInt(id), { questions });
        return res.status(201).json({
            success: 201,
            message: 'Successfully created scenario content.',
            data: scenario
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const updateHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, courseId, year, description } = req.body;
        let image = req.body.image;
        const file = req.file;
        if (file) {
            if (image) {
                await deleteFile(image);
            }
            image = await uploadFile(file);
        }
        const scenario = await updateScenario(parseInt(id), { title, courseId:parseInt(courseId), year, description,image });
        return res.status(200).json({
            success: 200,
            message: 'Successfully updated scenario.',
            data: scenario
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const scenario = await deleteScenario(parseInt(id));
        await deleteFile(scenario.image);
        return res.status(200).json({
            success: 200,
            message: 'Successfully deleted scenario.',
            data: scenario
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

module.exports = {
    getAllHandler,
    getOneHandler,
    createHandler,
    createContentHandler,
    updateHandler,
    deleteHandler
}
