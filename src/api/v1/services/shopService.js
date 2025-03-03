const prisma = require('../../../config/dbConfig.js');

const findAll = async () => {
    return await prisma.shop.findMany();
}

const findById = async (id) => {
    return await prisma.shop.findUnique({
        where: {
            id: id
        }
    });
}

const create = async (data) => {
    return await prisma.shop.create({
        data: data
    });
}

const update = async (id,data) => {
    return await prisma.shop.update({
        where: {
            id: id
        },
        data:data
    });
}

const remove = async (id) => {
    return await prisma.shop.delete({
        where: {
            id: id
        }
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}