const prisma = require('../../../config/dbConfig');

const findAllSchoolYears = async () => {
    return await prisma.schoolYear.findMany({
        include: {
            module: true
        }
    });
}

const findSchoolYearsDetails = async (ids) => {
    return await prisma.schoolYear.findMany({
        where: {
            id: {
                in: ids
            }
        },
        include: {
            module: {
                include: {
                    course: {
                        select: {
                            id: true,
                            title: true,
                            type: true,
                            _count: {
                                select: {
                                    question: true,
                                    scenario: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}


const findSchoolYearById = async (id) => {
    return await prisma.schoolYear.findUnique({
        where: {
            id: id
        },
        include: {
            module: true
        }
    });
}

const createSchoolYear = async (schoolYear) => {
    return await prisma.schoolYear.create({
        data: {
            title: schoolYear.title,
        }
    });
}

const updateSchoolYear = async (schoolYear, id) => {
    return await prisma.schoolYear.update({
        where: {
            id
        },
        data: schoolYear
    });
}

const deleteSchoolYear = async (id) => {
    return await prisma.schoolYear.delete({
        where: {
            id
        }
    });
}

module.exports = {
    findSchoolYearsDetails,
    findAllSchoolYears,
    findSchoolYearById,
    createSchoolYear,
    updateSchoolYear,
    deleteSchoolYear
}