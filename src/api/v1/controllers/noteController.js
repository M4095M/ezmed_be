const createError = require('http-errors');
const { getAllNotes, getNoteById, getNoteByQuestionId, getNoteByUserId, createNote, deleteNote, updateNote } = require('../services/noteService.js');

const getAllHandler = async (req, res, next) => {
    try {
        const notes = await getAllNotes();
        return res.status(200).json({
            status:200,
            message:"Successfully fetched all notes.",
            data:notes
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

const getByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const note = await getNoteById(parseInt(id));
        return res.status(200).json({
            status:200,
            message:"Successfully fetched note by id.",
            data:note
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const getAllByQuestionHandler = async (req, res, next) => {
    try {
        const { questionId } = req.params;
        const { id:userId } = req.user;
        const notes = await getNoteByQuestionId(parseInt(questionId),userId);
        return res.status(200).json({
            status:200,
            message:"Successfully fetched notes by question id.",
            data:notes
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const postHandler = async (req, res, next) => {
    try {
        const { id:userId } = req.user;
        const { questionId, description } = req.body;
        const note = await createNote({
            questionId:parseInt(questionId),
            userId:parseInt(userId),
            description
        });
        return res.status(201).json({
            status:201,
            message:"Successfully created note.",
            data:note
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const putHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const note = await updateNote(parseInt(id), {
            description
        });
        return res.status(200).json({
            status:200,
            message:"Successfully updated note.",
            data:note
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const note = await deleteNote(parseInt(id));
        return res.status(200).json({
            status:200,
            message:"Successfully deleted note.",
            data:note
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

module.exports = {
    getAllHandler,
    getAllByQuestionHandler,
    getAllByQuestionHandler,
    getByIdHandler,
    postHandler,
    putHandler,
    deleteHandler
}
