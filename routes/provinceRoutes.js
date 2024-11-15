const express = require('express');
const provinceRouter = express.Router();
const provinceController = require('../controllers/provinceController');

//get all provinces
provinceRouter.get('/', provinceController.getAllProvinces);

//get province by id --optionally get all associated districts with ?getAll=true
provinceRouter.get('/:id', provinceController.getProvinceById);

//get all associated districts of a province
provinceRouter.get('/:id/districts', provinceController.getDistrictsOfProvince);

//get District Count Of a Province
provinceRouter.get('/:id/district-count', provinceController.getDistrictCountByProvince);


module.exports = provinceRouter;