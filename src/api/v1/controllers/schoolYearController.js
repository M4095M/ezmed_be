const {  getUserPermissions } = require('../services/payService.js');
const {findAllSchoolYears,findSchoolYearById,createSchoolYear,updateSchoolYear,deleteSchoolYear, findSchoolYearsDetails} = require('../services/schoolYearService.js')
const createError = require('http-errors');

const getAllHandler = async (req, res, next) => {
    try {
        const schoolYears = await findAllSchoolYears();
        res.status(200).json({
            status: 200,
            message: "Successfully fetched all schoolYears.",
            data: schoolYears
        });
    } catch (err) {
        next(createError(500, err.message));
    }
}

const getAllUserHandler = async (req, res, next) => {
    try {
        const {id} = req.user;
        // fetch user years permission
        const payments = await getUserPermissions(id);
        // get the list of school years ids
        const schoolYearsIds = payments.map(payment => {
            return payment.plan.Permission.map(permission => {
                return permission.schoolYear.id
            })
        });
        const flatIdArray = schoolYearsIds.flat().length > 0 ? schoolYearsIds.flat() : [5];
        const schoolYears = await findSchoolYearsDetails(flatIdArray);
        res.status(200).json({
            status: 200,
            message: "Successfully fetched all schoolYears.",
            data: schoolYears
        });
    } catch (err) {
        next(createError(500, err.message));
    }
}

const getByIdHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const schoolYear = await findSchoolYearById(parseInt(id));
        res.status(200).json({
            status: 200,
            message: "Successfully fetched schoolYear by id.",
            data: schoolYear
        });
    } catch (err) {
        next(createError(400, err.message))
    }
}

const postHandler = async (req, res, next) => {
    try {
        const {title}=req.body;
        const schoolYear = await createSchoolYear({title});
        res.status(201).json({
            status: 201,
            message: "Successfully created a new schoolYear.",
            data: schoolYear
        });
    } catch (err) {
        next(createError(400, err.message))
    }
}

const putHandler = async (req, res, next) => {
    try {
        const {title}=req.body;
        const {id}=req.params;
        const schoolYear = await updateSchoolYear({title},parseInt(id));
        res.status(200).json({
            status: 200,
            message: "Successfully updated schoolYear by id.",
            data: schoolYear
        });
    } catch (err) {
        console.log(err)
        next(createError(400, err.message))
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const {id}=req.params;
        const schoolYear = await deleteSchoolYear(parseInt(id));
        res.status(200).json({
            status: 200,
            message: "Successfully deleted schoolYear by id.",
            data: schoolYear
        });
    } catch (err) {
        next(createError(400, err.message))
    }
}

module.exports = {
    getAllUserHandler,
    getAllHandler,
    getByIdHandler,
    postHandler,
    putHandler,
    deleteHandler
}