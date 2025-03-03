const route = require('express').Router();
const schoolYearRoute = require('./schoolYearRoute.js');
const moduleRoute = require('./moduleRoute.js');
const planRoute = require('./planRoute.js');
const scenarioRoute = require('./scenarioRoute.js');
const courseRoute = require('./coursRoute.js');
const authRoute = require('./authRoute.js');
const faqRoute = require('./faqRoute.js');
const userRoute = require('./userRoute.js');
const questionRoute = require('./questionRoute.js');
const payRoute = require('./payRoute.js');
const shopRoute = require('./shopRoute.js');
const propositionRoute = require('./propositionRoute.js');
const couponRoute = require('./couponRoute.js');
const commentRoute= require('./commentRoute.js');
const noteRoute = require('./noteRoute.js');
const playlistRoute = require('./playlistRoute.js');
const { isAuth, isAdmin, inSession } = require('../middlewares/authMiddleware.js');

route.get('/', (_req, res) => {
    res.json({ message: "Welcome to our V1 of the application." });
});

route.use('/auth',authRoute)
route.use('/schoolYears', schoolYearRoute);
route.use('/modules',isAuth,isAdmin, moduleRoute);
route.use('/plans', planRoute);
route.use('/scenarios',isAuth,isAdmin, scenarioRoute);
route.use('/courses',isAuth,isAdmin, courseRoute);
route.use('/faqs', faqRoute);
route.use('/users', userRoute);
route.use('/questions',isAuth,isAdmin, questionRoute);
route.use('/shops', shopRoute);
route.use('/payments', payRoute)
route.use('/coupons', couponRoute);
route.use('/propositions',isAuth,isAdmin, propositionRoute);
route.use('/comments',isAuth, commentRoute);
route.use('/notes',inSession,isAuth, noteRoute);
route.use('/playlist',inSession,isAuth,playlistRoute)

module.exports = route;