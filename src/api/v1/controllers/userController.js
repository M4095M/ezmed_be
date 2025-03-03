const createError = require('http-errors');
const {findAllUsers, findUserById,findAllUserPayments, updateUser} = require('../services/userService.js');
const bcrypt = require('bcrypt');

const getAllHandler = async (req, res, next) => {
    try {
        const users = await findAllUsers();
        return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all users',
            data: users
        });
    } catch (error) {
        next(createError(500, error.message));
    }
}

const getAllPaymentHandler = async (req, res, next) => {
    try {
        const users = await findAllUserPayments();
        return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all users',
            data: users
        });
    } catch (error) {
        next(createError(500, error.message));
    }
}

const getOneHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await findUserById(parseInt(id));
        return res.status(200).json({
            status: 200,
            message: 'Successfully retrieved user',
            data: user
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const updateHandler = async (req, res, next) => {
    try {
        const {id} = req.user;
        const {fullName, email,phone,birthday} = req.body;
        let {password} = req.body;
        const oldUser= await findUserById(parseInt(id));
        if(!(oldUser.password===password)){
            password=await bcrypt.hash(password, 10);
        }
        const user = await updateUser(parseInt(id), {fullName, email, password,phone,birthday});
        return res.status(200).json({
            status: 200,
            message: 'Successfully updated user',
            data: user
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}


const banHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const user = await updateUser(parseInt(id), {status});
        return res.status(200).json({
            status: 200,
            message: 'Successfully updated user',
            data: user
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}



module.exports = {
    getAllHandler,
    getOneHandler,
    getAllPaymentHandler,
    updateHandler,
    banHandler
}