const createError = require('http-errors');
const { getCurrentPayments, getPaymentById, updatePayment, createPayment } = require('../services/payService.js');
const { findPlanById } = require('../services/planService.js');
const { uploadFile } = require('../helpers/uploadFile.js');
const { updateUser } = require('../services/userService.js');

const getAllHandler = (req, res, next) => {
    try {

    } catch (error) {
        next(createError(500, error.message));
    }
}

const getOneHandler = (req, res, next) => {
    try {

    } catch (error) {
        next(createError(500, error.message));
    }
}

const getCurrentHandler = async (req, res, next) => {
    try {
        const payments = await getCurrentPayments();
        res.status(200).json({
            status: 200,
            message: 'Payments fetched successfully',
            data: payments
        });
    } catch (error) {
        next(createError(500, error.message));
    }
}

const createHandler = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { planId, type } = req.body;
        const proof = await uploadFile(req.file);
        const payment = await createPayment({ planId: parseInt(planId), userId: parseInt(userId), type, prof: proof });
        return res.status(201).json({
            status: 201,
            message: 'Payment created successfully',
            data: payment
        });
    } catch (error) {
        next(createError(500, error.message));
    }
}
const validateHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedPayment = await updatePayment(parseInt(id), { status: true });
        res.status(201).json({
            status: 201,
            message: 'Payment validated successfully',
            data: updatedPayment
        });
    }
    catch (error) {
        next(createError(400, error.message));
    }
}

const updateHandler = (req, res, next) => {
    try {

    } catch (error) {
        next(createError(500, error.message));
    }
}

const deleteHandler = (req, res, next) => {
    try {

    } catch (error) {
        next(createError(500, error.message));
    }
}

module.exports = {
    getAllHandler,
    getOneHandler,
    getCurrentHandler,
    createHandler,
    validateHandler,
    updateHandler,
    deleteHandler
}