const prisma = require('../../../config/dbConfig.js');

const fetchScenarios = async (courses, years) => {
    const scenarios = await prisma.scenario.findMany({
        where: {
            courseId: {
                in: courses
            },
            year: {
                in: years
            }
        },
        include: {
            course:true,
            question: {
                include: {
                    proposition: true
                }
            }
        }
    });
    return scenarios;
}

const findAllScenarios = async () => {
    return await prisma.scenario.findMany({
        include: {
            question: {
                include: {
                    proposition: true
                }
            }
        }
    });
}

const findScenarioById = async (id) => {
    return await prisma.scenario.findUnique({
        where: {
            id
        },
        include: {
            question: {
                include: {
                    proposition: true
                }
            }
        }
    });
}

const createScenario = async (scenario) => {
    return await prisma.scenario.create({
        data: scenario
    });
}

const createContent = async (id, content) => {
    const createQuestionPromises = content.map(async (element) => {
        const qst = await prisma.question.create({
            data: {
                scenarioId: id,
                ...element
            }
        });

        const propositionData = element.propositions.map((proposition) => ({
            questionId: qst.id,
            ...proposition
        }));

        await prisma.proposition.createMany({
            data: propositionData
        });
    });

    await Promise.all(createQuestionPromises);
    return await findScenarioById(id);
}

const updateScenario = async (id, scenario) => {
    return await prisma.scenario.update({
        where: {
            id: id
        },
        data: scenario
    });
}

const deleteScenario = async (id) => {
    return await prisma.scenario.delete({
        where: {
            id: id
        }
    });
}

module.exports = {
    fetchScenarios,
    findAllScenarios,
    findScenarioById,
    createScenario,
    createContent,
    updateScenario,
    deleteScenario
}