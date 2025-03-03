const prisma = require('../../../config/dbConfig.js');

const createPropositions = async (propositions) => {
    const result = await prisma.proposition.createMany({
        data: propositions
    });
    return result;
}

const createProposition = async (proposition) => {
    const result = await prisma.proposition.create({
        data: proposition
    });
    return result;
}

const findPropositionById = async (id) => {
    const result = await prisma.proposition.findUnique({
        where: { id }
    });
    return result;
}

const updateProposition = async (id, proposition) => {
    const result = await prisma.proposition.update({
        where: { id },
        data: proposition
    });
    return result;
}

const deleteProposition = async (id) => {
    const result = await prisma.proposition.delete({
        where: { id }
    });
    return result;
}

const deletePropositions = async (id) => {
    const result = await prisma.proposition.deleteMany({
        where: { questionId: id }
    });
    return result;
}

module.exports = {
    createProposition,
    createPropositions,
    findPropositionById,
    updateProposition,
    deleteProposition,
    deletePropositions
}