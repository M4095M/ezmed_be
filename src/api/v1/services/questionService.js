const prisma= require('../../../config/dbConfig.js');

const fetchQuestions = async (courses,years) => {
    const questions = await prisma.question.findMany({
        where:{
            courseId:{
                in:courses
            },
            year:{
                in:years
            }
        },
        include:{
            course:true,
            proposition:true
        }
    });
    return questions;
}

const createQuestion = async (data) => {
    const question= await prisma.question.create({
        data: data
    });
    return question;
}

const findQuestionById = async (id) => {
    const question = await prisma.question.findUnique({
        where: { id },
        include:{
            comment:{
                include:{
                    user:true
                }
            },
            proposition:true
        }
    });
    return question;
}

const updateQuestion = async (id, data) => {
    const question = await prisma.question.update({
        where: { id },
        data: data
    });
    return question;
}

const deleteQuestion = async (id) => {
    const question = await prisma.question.delete({
        where: { id }
    });
    return question;
}

module.exports = {
    fetchQuestions,
    createQuestion,
    findQuestionById,
    updateQuestion,
    deleteQuestion
}
