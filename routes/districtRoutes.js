const express = require('express');
const districtRouter = express.Router();
const districtController = require('../controllers/districtController');

//get all districts
districtRouter.get('/', districtController.getAllDistricts);

//get district by id
districtRouter.get('/:id', districtController.getDistrictById)

//search districts
districtRouter.get('/search', districtController.searchDistricts);

//get the province of a district --optionally get all associated districts with ?getAll=true
districtRouter.get('/:id/province', districtController.getProvinceOfDistrict);

module.exports = districtRouter;