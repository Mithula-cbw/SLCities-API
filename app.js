const express = require('express');
const app = express();

//import middlewares
const helperMiddleware = require('./middleware/helper');

//import routers
const districtRouter = require('./routes/districtRoutes');
const provinceRouter = require('./routes/provinceRoutes');
const cityRouter = require('./routes/cityRoutes');

//use middlewares
//global middlewares
app.use(express.json()); 
app.use('/', helperMiddleware.printReq);

//routes
app.use('/districts/', districtRouter);
app.use('/provinces/', provinceRouter);
app.use('/cities', cityRouter);


// Global error handling middleware
app.use(helperMiddleware.globalErrorHandler);

module.exports = app;
