const prisma = require('../../../config/dbConfig.js');

const findAllFaqs = async () => {
    const faqs= await prisma.faq.findMany();
    return faqs;
}

const findFaqById = async (id) => {
    const faq = await prisma.faq.findUnique({
        where: {
            id: id
        }
    });
    return faq;
}

const createFaq = async (data) => {
    const faq = await prisma.faq.create({
        data: data
    });
    return faq;
}

const updateFaq = async (id, data) => {
    const faq = await prisma.faq.update({
        where: {
            id: id
        },
        data: data
    });
    return faq;
}

const deleteFaq = async (id) => {
    const faq = await prisma.faq.delete({
        where: {
            id: id
        }
    });
    return faq;
}

module.exports = {
    findAllFaqs,
    findFaqById,
    createFaq,
    updateFaq,
    deleteFaq
}