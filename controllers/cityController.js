//models
const cityModel = require('../models/city');
const districtModel = require('../models/district');

//utils
const fuzzySearch = require('../utils/fusySearch')

//controllers
// Get all cities
const getAllCities = async (req, res) => {
    try {
        const allCities = await cityModel.getAllCities();

        if (allCities && allCities.length > 0) {
            res.status(200).json({
                message: `Found ${allCities.length} cities`,
                data: allCities
            });
        } else {
            return res.status(404).json({
                message: "No cities found"
            });
        }
    } catch (err) {
        console.error("Error fetching cities:", err);  // dev-log
        return res.status(500).json({
            message: "An error occurred while fetching cities",
            error: err.message || err
        });
    }
};

// Get city by id
const getCityById = async (req, res) => {
    const id = req.params.id;
    console.log("City lookup initiated");

    try {
        const city = await cityModel.getCityById(id);

        if (city && city.length > 0) {
            res.status(200)
                .json({
                    msg: "City found",
                    data: city[0]
                })
        } else {
            res.status(404)
                .json({
                    msg: "No such city exists",
                })
        }
    } catch (err) {
        res.status(500)
            .json({
                msg: "There was an error processing your request",
                error: err.message
            })
    }
}

// Get the district of a city -- optionally get all associated cities with ?getAll=true
const getDistrictOfCity = async (req, res) => {
    const city_id = req.params.id;
    const isGetAll = req.query.getAll === "true";

    try {
        const city = await cityModel.getCityById(city_id);

        if (!city || city.length === 0) {
            return res.status(404).json({
                msg: "City not found"
            });
        }

        const { district_id } = city[0];

        if (!district_id) {
            return res.status(404).json({
                msg: "City doesn't have a district associated"
            });
        }

        const district = await districtModel.getDistrictById(district_id);

        if (district && district.length > 0) {
            if (isGetAll) {
                const allCitiesOfDistrict = await districtModel.getCitiesOfDistrict(district_id);

                return res.status(200).json({
                    msg: `Found district and its ${allCitiesOfDistrict.length} associated cities`,
                    data: {
                        district: district[0],
                        city_count: allCitiesOfDistrict.length,
                        cities: allCitiesOfDistrict
                    }
                });
            } else {
                return res.status(200).json({
                    msg: `Here is the district of ${city[0].name}`,
                    data: district[0]
                });
            }
        } else {
            return res.status(404).json({
                msg: "Couldn't find district"
            });
        }
    } catch (err) {
        return res.status(500).json({
            msg: "Error processing your request",
            error: err.message
        });
    }
};

// Search cities by string input -- optionally get close suggestions by ?fusy=true
const searchCities = async (req, res) => {
    const searchString = req.query.q;
    const isFusy = req.query.fusy === 'true';

    if (!searchString) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Fetch the exact matches from the database
        const matches = await cityModel.searchCities(searchString);

        // If no matches are found, suggest fuzzy matches
        const suggestion = matches.length > 0 || !isFusy
            ? null
            : await fuzzySearchForCities(searchString, 1);

        // Check if we found matches and respond accordingly
        if (matches.length > 0) {
            const responseData = { matches };
            if (isFusy && suggestion) {
                responseData.suggestion = suggestion[0];
            }
            return res.status(200).json({
                message: 'Here are the results we found for your query',
                data: responseData
            });
        }

        // If no matches found, respond with fuzzy suggestion
        res.status(200).json({
            message: `No match found for '${searchString}'. Did you mean one of these?`,
            data: {
                suggestion: suggestion || []
            }
        });
        

    } catch (err) {
        console.error(err); //dev-log
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


// Create a city -- optional near cities inside a radius ?r=#
const createCity = async (req, res) => {
    const { city } = req.body;
    const getNear = req.query.near === 'true'; 
    const radius = req.query.r || 30;  

    if (!city) {
        return res.status(400).json({
            msg: "City data is required",
        });
    }

    try {
        const newCity = await cityModel.createCity(city);

        if (newCity) {
            // If near cities are requested, get them
            if (getNear) {
                const nearCities = await getNearCities(newCity.cityId, radius);

                res.status(200).json({
                    msg: `City created successfully, Near cities:`,
                    data: {
                        city: newCity.cityId,
                        near_cities: nearCities
                    }
                });
            } else {
                res.status(200).json({
                    msg: "City created successfully",
                    data: newCity.cityId,
                });
            }
        } else {
            res.status(400).json({
                msg: "Failed to create city",
            });
        }
    } catch (err) {
        console.error("Error creating city:", err);
        res.status(500).json({
            msg: "An error occurred while creating the city",
            error: err.message,
        });
    }
};
// Helper functions
// Fuzzy search for finding similar names
const fuzzySearchForCities = async (searchString, limit) => {
    try {
        // Fetch all cities from the model
        const allCities = await cityModel.getAllCities();

        if (allCities && allCities.length > 0) {

            const fuzzyMatches = fuzzySearch(allCities, searchString);

            if (fuzzyMatches && fuzzyMatches.length > 0) {
                // Limit the results to the specified limit
                return fuzzyMatches.slice(0, limit);
            } else {
                return [];
            }
        } else {
            return [];
        }
    } catch (err) {
        console.log("Error during fuzzy search:", err.message); //dev-log
        throw err;
    }
};

// Get nearby cities -- optional radius ?r=#
const getNearCities = async (cityId, radius = 30) => {
    return {
        msg: `Nearby cities of cityId: ${cityId} within ${radius} km`, //dev-future
        radius: radius
    };
};


module.exports = {
    getAllCities,
    getCityById,
    getDistrictOfCity,
    searchCities,
    createCity
};
