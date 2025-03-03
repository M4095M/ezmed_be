const createError = require('http-errors');
const {findAllFaqs, findFaqById, createFaq, updateFaq, deleteFaq} = require('../services/faqService.js');

const getAllHandler = async (req, res, next) => {
    try {
        const faqs = await findAllFaqs();
        res.status(200).json({
            status:200,
            message: 'Successfully fetched all faqs',
            data: faqs
        });
    } catch (error) {
        next(createError(400, error.message))
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const faq = await findFaqById(parseInt(id));
        res.status(200).json({
            status:200,
            message: 'Successfully fetched faq',
            data: faq
        });
    } catch (error) {
        next(createError(400, error.message))
    }
}

const postHandler = async (req, res, next) => {
    try {
        const {question, answer} = req.body;
        const faq = await createFaq({question, answer});
        res.status(201).json({
            status:201,
            message: 'Successfully created faq',
            data: faq
        });
    } catch (error) {
        next(createError(400, error.message))
    }
}

const updateHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {question, answer} = req.body;
        const faq = await updateFaq(parseInt(id), {question, answer});
        res.status(200).json({
            status:200,
            message: 'Successfully updated faq',
            data: faq
        });
    } catch (error) {
        next(createError(400, error.message))
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const faq = await deleteFaq(parseInt(id));
        res.status(200).json({
            status:200,
            message: 'Successfully deleted faq',
            data: faq
        });
    } catch (error) {
        next(createError(400, error.message))
    }
}

module.exports = {
    getAllHandler,
    getByIdHandler,
    postHandler,
    updateHandler,
    deleteHandler
}