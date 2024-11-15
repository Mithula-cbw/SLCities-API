const express = require('express');
const cityRouter = express.Router();
const cityController = require('../controllers/cityController');

// Search cities -- optionally get close suggestion if no match found with ?fusy=true
cityRouter.get('/search', cityController.searchCities);

// Get all cities 
cityRouter.get('/', cityController.getAllCities);

// Get city by ID 
cityRouter.get('/:id', cityController.getCityById);

// Get the district of a city -- optionally get all associated cities with ?getAll=true
cityRouter.get('/:id/district', cityController.getDistrictOfCity);

cityRouter.post('/', cityController.createCity);

module.exports = cityRouter;
