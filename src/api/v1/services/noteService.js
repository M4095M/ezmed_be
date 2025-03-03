const prisma = require('../../../config/dbConfig.js');

const getAllNotes = async () => {
    return await prisma.note.findMany({
        include:{
            question:true,
            user:true
        }
    });
}

const getNoteById = async (id) => {
    return await prisma.note.findUnique({
        where:{
            id:parseInt(id)
        },
        include:{
            question:true,
            user:true
        }
    });
}

const getNoteByQuestionId = async (questionId,userId) => {
    return await prisma.note.findMany({
        where:{
            userId:userId,
            questionId:questionId
        },
        include:{
            question:true,
            user:true
        }
    });
}

const getNoteByUserId = async (userId) => {
    return await prisma.note.findMany({
        where:{
            userId:userId
        },
        include:{
            question:true,
            user:true
        }
    });
}

const createNote = async (note) => {
    return await prisma.note.create({
        data:note
    });
}

const updateNote = async (id, note) => {
    return await prisma.note.update({
        where:{
            id:parseInt(id)
        },
        data:note
    });
}

const deleteNote = async (id) => {
    return await prisma.note.delete({
        where:{
            id:parseInt(id)
        }
    });
}

module.exports = {
    getAllNotes,
    getNoteById,
    getNoteByQuestionId,
    getNoteByUserId,
    createNote,
    updateNote,
    deleteNote
}