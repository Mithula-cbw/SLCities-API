const express = require('express');
const provinceRouter = express.Router();
const provinceController = require('../controllers/provinceController');

//get all districts
provinceRouter.get('/', provinceController.getAllProvinces);

//get district by id
provinceRouter.get('/:id', provinceController.getProvinceById);

module.exports = provinceRouter;