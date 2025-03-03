const createError = require('http-errors');
const {
    findAllComments,
    findCommentById,
    createComment,
    updateComment,
    deleteComment
} = require('../services/commentService.js');

const getAllHandler = async (_req, res, next) => {
    try {
        const comments = await findAllComments();
        return res.status(200).json({
            status: 200,
            message: "Successfully fetched all comments.",
            data: comments
        })
    } catch (error) {
        next(createError(500, error.message));
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await findCommentById(parseInt(id));
        return res.status(200).json({
            status: 200,
            message: "Successfully fetched comment By Id.",
            data: comment
        })
    } catch (error) {
        next(createError(400, error.message));
    }
}

const postHandler = async (req, res, next) => {
    try {
        const { content, questionId } = req.body;
        const userId = req.user.id;
        const comment = await createComment({ content, questionId: parseInt(questionId), userId: parseInt(userId) });
        return res.status(201).json({
            status: 201,
            message: "Successfully created comment.",
            data: comment
        })
    } catch (error) {
        next(createError(400, error.message));
    }
}

const putHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content,isPingged } = req.body;
        const comment = await updateComment(parseInt(id), { content,isPingged });
        return res.status(200).json({
            status: 200,
            message: "Successfully updated comment.",
            data: comment
        })
    } catch (error) {
        next(createError(400, error.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await deleteComment(parseInt(id));
        return res.status(200).json({
            status: 200,
            message: "Successfully deleted comment.",
            data: comment
        })
    } catch (error) {
        next(createError(400, error.message));
    }
}

module.exports = {
    getAllHandler,
    getByIdHandler,
    postHandler,
    putHandler,
    deleteHandler
}