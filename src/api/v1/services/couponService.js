const prisma = require('../../../config/dbConfig.js');

const findAllCoupons = async () => {
    return await prisma.coupon.findMany({
        include:{
            plan: true
        }
    });
}

const findCouponById = async (id) => {
    return await prisma.coupon.findUnique({
        where:{
            id: id
        },
        include:{
            plan: true
        }
    });
}

const findCouponByCode = async (code) => {
    return await prisma.coupon.findUnique({
        where:{
            code: code
        },
        include:{
            plan: true
        }
    });
}

const createCoupon = async (data) => {
    return await prisma.coupon.create({
        data:data,
        include:{
            plan: true
        }
    });
}

const updateCoupon = async (id, data) => {
    return await prisma.coupon.update({
        where:{
            id: id
        },
        data:data,
        include:{
            plan: true
        }
    });
}

const deleteCoupon = async (id) => {
    return await prisma.coupon.delete({
        where:{
            id: id
        },
        include:{
            plan: true
        }
    });
}

module.exports = {
    findAllCoupons,
    findCouponById,
    findCouponByCode,
    createCoupon,
    updateCoupon,
    deleteCoupon
}