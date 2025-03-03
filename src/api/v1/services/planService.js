const prisma = require('../../../config/dbConfig.js');

const findAllPlans = async () => {
    return await prisma.plan.findMany();
}

const findPlanById = async (id) => {
    return await prisma.plan.findUnique({
        where:{
            id: id
        }
    });
}

const createPlan = async ({title, price,date, description}) => {
    return await prisma.plan.create({
        data:{
            title, price, date, description
        }
    });
}

const updatePlan = async (id, {title, price, description,date}) => {
    return await prisma.plan.update({
        where:{
            id: id
        },
        data:{
            title, price, description, date
        }
    });
}

const deletePlan = async (id) => {
    return await prisma.plan.delete({
        where:{
            id: id
        }
    });
}

module.exports = {
    findAllPlans,
    findPlanById,
    createPlan,
    updatePlan,
    deletePlan
}