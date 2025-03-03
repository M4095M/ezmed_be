const createError = require('http-errors');
const {findAllPlans, findPlanById, createPlan, updatePlan, deletePlan} = require('../services/planService.js');
const {createPermission} = require('../services/permissionService.js');

const getAllHandler = async (req, res, next) => {
    try{
        const plans = await findAllPlans();
        res.status(200).json({
            status:200,
            message: 'Successfully retrieved all plans',
            data: plans
        });
    }catch(err){
        next(createError(500, err.message));
    }
}

const getByIdHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const plan = await findPlanById(parseInt(id));
        res.status(200).json({
            status:200,
            message: 'Successfully retrieved plan',
            data: plan
        });
    }catch(err){
        next(createError(400, err.message));
    }
}

const postHandler = async (req, res, next) => {
    try{
        const {title, price,date, description, permissions} = req.body;

        const plan = await createPlan({title,date:new Date(date), price, description});
        const permissionPromises = permissions.map(permission =>
            createPermission({ planId: plan.id, schoolYearId: parseInt(permission) })
        );

        await Promise.all(permissionPromises);
        res.status(201).json({
            status:201,
            message: 'Successfully created plan',
            data: plan
        });
    }catch(err){
        next(createError(400, err.message));
    }
}

const updateHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {title, price, description,date} = req.body;
        const plan = await updatePlan(parseInt(id), {title, price, description,date:new Date(date)});
        res.status(200).json({
            status:200,
            message: 'Successfully updated plan',
            data: plan
        });
    }catch(err){
        next(createError(400, err.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try{
        const {id} = req.params;
        const plan = await deletePlan(parseInt(id));
        res.status(200).json({
            status:200,
            message: 'Successfully deleted plan',
            data: plan
        });
    }catch(err){
        console.log(err);
        next(createError(400, err.message));
    }
}

module.exports = {
    getAllHandler,
    getByIdHandler,
    postHandler,
    updateHandler,
    deleteHandler
}