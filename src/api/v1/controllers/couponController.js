const createError = require('http-errors');
const crypto = require('crypto');
const { findAllCoupons, findCouponById, findCouponByCode, createCoupon, updateCoupon, deleteCoupon } = require('../services/couponService.js');
const { createPayment } = require('../services/payService.js');

const getAllHandler = async (req, res, next) => {
    try {
        const coupons = await findAllCoupons();
        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved all coupons',
            data: coupons
        });
    } catch (err) {
        next(createError(500, err.message));
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const coupon = await findCouponById(parseInt(id));
        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved coupon',
            data: coupon
        });
    } catch (err) {
        next(createError(400, err.message));
    }
}

const postHandler = async (req, res, next) => {
    try {
        const { planId } = req.body;
        const code = crypto.randomBytes(12).toString("hex");
        const coupon = await createCoupon({ code, planId: parseInt(planId) });
        res.status(201).json({
            status: 201,
            message: 'Successfully created coupon',
            data: coupon
        });
    } catch (err) {
        console.log(err);
        next(createError(400, err.message));
    }
}

const postCheckHandler = async (req, res, next) => {
    try {
        const { code } = req.body;
        const coupon = await findCouponByCode(code);
        if (!coupon.status) throw new Error("Coupon has already been used");
        const payment = await createPayment({ planId: coupon.planId, userId: req.user.id, type: "coupon", prof: code, status: true });
        await updateCoupon(coupon.id, { status: false });
        res.status(200).json({
            status: 200,
            message: 'Successfully checked coupon',
            data: payment
        });
    } catch (err) {
        next(createError(400, err.message));
    }
}

const updateHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { planId, status } = req.body;
        const coupon = await updateCoupon(parseInt(id), { planId, status });
        res.status(200).json({
            status: 200,
            message: 'Successfully updated coupon',
            data: coupon
        });
    } catch (err) {
        next(createError(400, err.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const coupon = await deleteCoupon(parseInt(id));
        res.status(200).json({
            status: 200,
            message: 'Successfully deleted coupon',
            data: coupon
        });
    } catch (err) {
        next(createError(400, err.message));
    }
}

module.exports = {
    getAllHandler,
    getByIdHandler,
    postHandler,
    postCheckHandler,
    updateHandler,
    deleteHandler
}