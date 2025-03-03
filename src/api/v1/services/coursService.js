const prisma = require('../../../config/dbConfig.js');

const findAllCours = async () => {
    return await prisma.course.findMany();
}

const findCoursById = async (id) => {
    return await prisma.course.findUnique({
        where: {
            id: id
        },
        include: {
            module: true,
            scenario: true,
            question: {
                include:{
                    proposition: true
                }
            }
        }
    });
}

const createCours = async (cours) => {
    return await prisma.course.create({
        data: cours
    });
}

const updateCours = async (cours, id) => {
    return await prisma.course.update({
        where: {
            id: id
        },
        data: cours
    });
}

const deleteCours = async (id) => {
    return await prisma.course.delete({
        where: {
            id: id
        }
    });
}

module.exports = {
    findAllCours,
    findCoursById,
    createCours,
    updateCours,
    deleteCours
}
