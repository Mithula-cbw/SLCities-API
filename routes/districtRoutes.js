const express = require('express');
const districtRouter = express.Router();
const districtController = require('../controllers/districtController');

//get all districts
districtRouter.get('/all', districtController.getAllDistricts);

module.exports = districtRouter;