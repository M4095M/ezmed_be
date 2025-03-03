const prisma = require('../../../config/dbConfig.js');

const findAllModules = async () => {
    return await prisma.module.findMany(
        {
            include: {
                schoolYear: true,
                course: true
            }
        }
    );
}

const findModuleById = async (id) => {
    return await prisma.module.findUnique({
        where: {
            id: id
        },
        include: {
            schoolYear: true,
            course: true
        }
    });
}

const createModule = async (module) => {
    return await prisma.module.create({
        data: {
            title: module.title,
            image: module.image,
            description: module.description,
            schoolYear:{
                connect: {
                    id: module.schoolYearId
                }
            }
        },
        include: {
            schoolYear: true,
            course: true
        }
    });
}

const updateModule = async (module, id) => {
    return await prisma.module.update({
        where: {
            id: id
        },
        data: module,
        include: {
            schoolYear: true,
            course: true
        }
    });
}

const deleteModule = async (id) => {
    return await prisma.module.delete({
        where: {
            id: id
        },
        include: {
            schoolYear: true,
            course: true
        }
    });
}

module.exports = {
    findAllModules,
    findModuleById,
    createModule,
    updateModule,
    deleteModule
}