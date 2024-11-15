const express = require('express');
const districtRouter = express.Router();
const districtController = require('../controllers/districtController');

// Search districts 
districtRouter.get('/search', districtController.searchDistricts);

// Get all districts 
districtRouter.get('/', districtController.getAllDistricts);

// Get district by ID 
districtRouter.get('/:id', districtController.getDistrictById);

// Get the province of a district -- optionally get all associated districts with ?getAll=true
districtRouter.get('/:id/province', districtController.getProvinceOfDistrict);

module.exports = districtRouter;
