const prisma = require('../../../config/dbConfig.js');

const createPermission = async (data) => {
    const permission = await prisma.permission.create({
        data: data
    });
    return permission;
}

module.exports = {
    createPermission
}