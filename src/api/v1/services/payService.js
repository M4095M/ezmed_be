const prisma = require('../../../config/dbConfig.js')

const getUserPermissions = async (id) => {
    const payments = await prisma.pay.findMany({
        where: {
            userId: id,
            status:true,
            plan:{
                date:{
                    gte: new Date()
                }
            }
        },
        include: {
            plan: {
                include:{
                    Permission:{
                        include:{
                            schoolYear: true
                        }
                    }
                }
            }
        }
    })
    return payments
}

const getCurrentPayments = async () => {
    const payments = await prisma.pay.findMany({
        where:{
            status: false
        },
        include: {
            user: true,
            plan:true
        }
    })
    return payments
}

const getPaymentById = async (id) => {
    const payment = await prisma.pay.findUnique({
        where: {
            id: id
        },
        include: {
            user: true
        }
    })
    return payment
}

const updatePayment = async (id, data) => {
    const payment = await prisma.pay.update({
        where: {
            id: id
        },
        data: {
            status: data.status
        },
        include: {
            user: true
        }
    })
    return payment
}

const createPayment= async (data) => {
    const payment = await prisma.pay.create({
        data: data,
        include: {
            user: true
        }
    })
    return payment
}

module.exports = {
    getUserPermissions,
    getCurrentPayments,
    getPaymentById,
    createPayment,
    updatePayment
}