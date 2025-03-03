const prisma = require('../../../config/dbConfig.js')

const createAdmin = async (admin) => {
    const newAdmin = await prisma.admin.create({
        data: admin
    })
    return newAdmin
}

const getAdminByEmail = async (email) => {
    const admin = await prisma.admin.findUnique({
        where: {
            email
        }
    })
    return admin
}

module.exports = {
    createAdmin,
    getAdminByEmail
}