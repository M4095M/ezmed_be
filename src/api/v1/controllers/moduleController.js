const createError = require('http-errors');
const {findAllModules, findModuleById, createModule, updateModule, deleteModule} = require('../services/moduleService.js');
const {uploadFile,deleteFile} = require('../helpers/uploadFile.js');

const getAllHandler = async (req, res , next) => {
    try{
        const modules = await findAllModules();
        return res.status(200).json({
            success: 200,
            message: 'Successfully fetched all modules.',
            data: modules
        });
    }catch(err){
        next(createError(500, err.message))
    }
}

const getByIdHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const module = await findModuleById(parseInt(id));
        res.status(200).json({
            success: 200,
            message: 'Successfully fetched module by id.',
            data: module
        });
    }catch(err){
        next(createError(400, err.message))
    }
}

const postHandler = async (req, res, next) => {
    try{
        const file = req.file;
        const image = await uploadFile(file);
        const {title,description,schoolYearId} = req.body;
        const module = await createModule({title,image,description,schoolYearId: parseInt(schoolYearId)});
        res.status(201).json({
            success: 201,
            message: 'Successfully created a new module.',
            data: module
        });
    }catch(err){
        console.log(err);
        next(createError(400, err.message))
    }
}

const putHandler = async (req, res, next) => {
    try{
        const {title,description} = req.body;
        const {id} = req.params;
        let image = req.body.image;
        const file = req.file;
        if (file) {
            if (image) {
                await deleteFile(image);
            }
            image = await uploadFile(file);
        }
        const module = await updateModule({title,description,image}, parseInt(id));
        res.status(200).json({
            success: 200,
            message: 'Successfully updated module by id.',
            data: module
        });
    }catch(err){
        next(createError(400, err.message))
    }
}

const deleteHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const module = await deleteModule(parseInt(id));
        await deleteFile(module.image);
        res.status(200).json({
            success: 200,
            message: 'Successfully deleted module by id.',
            data: module
        });
    }catch(err){
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