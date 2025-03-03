const prisma = require('../../../config/dbConfig.js');

const findAllComments = async () => {
    return await prisma.comment.findMany({
        include:{
            user: true,
            question: true
        }
    });
}

const findCommentById = async (id) => {
    return await prisma.comment.findUnique({
        where:{
            id: id
        },
        include:{
            user: true,
            question: true
        }
    });
}

const findCommentByQuestionId = async (questionId) => {
    return await prisma.comment.findMany({
        where:{
            questionId: questionId
        },
        include:{
            user: true,
            question: true
        }
    });
}

const findCommentByUserId = async (userId) => {
    return await prisma.comment.findMany({
        where:{
            userId: userId
        },
        include:{
            user: true,
            question: true
        }
    });
}

const createComment = async (data) => {
    return await prisma.comment.create({
        data:data,
        include:{
            user: true,
            question: true
        }
    });
}

const updateComment = async (id, data) => {
    return await prisma.comment.update({
        where:{
            id: id
        },
        data:data,
        include:{
            user: true,
            question: true
        }
    });
}

const deleteComment = async (id) => {
    return await prisma.comment.delete({
        where:{
            id: id
        },
        include:{
            user: true,
            question: true
        }
    });
}

module.exports = {
    findAllComments,
    findCommentById,
    findCommentByQuestionId,
    findCommentByUserId,
    createComment,
    updateComment,
    deleteComment
}