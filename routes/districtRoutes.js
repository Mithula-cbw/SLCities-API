const express = require('express');
const districtRouter = express.Router();
const districtController = require('../controllers/districtController');

//get all districts
districtRouter.get('/all', districtController.getAllDistricts);

//get district by id
districtRouter.get('/:id', districtController.getDistrictById)

//search districts
districtRouter.get('/search', districtController.searchDistricts);

//get the province of a district
districtRouter.get('/:id/province', districtController.getProvinceOfDistrict);

module.exports = districtRouter;