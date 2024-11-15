const districts = require('../models/district');

// Get all districts
const getAllDistricts = async (req, res) => {
    try {
        const allDistricts = await districts.getAllDistricts();

        if (allDistricts.length > 0) {
            res.status(200).json({
                message: `Found ${allDistricts.length} districts`,
                data: allDistricts
            });
        } else {
            res.status(404).json({
                message: "No districts found"
            });
        }
    } catch (err) {
        console.error("Error fetching districts:", err);  // dev-log
        res.status(500).json({
            message: "An error occurred while fetching districts",
            error: err.message || err
        });
    }
};

//search district by string input
const searchDistricts = async (req, res) => {
    const searchString = req.query.q;

    if (!searchString) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        const matches = await districts.searchDistricts(searchString);

        if (matches.length > 0) {
            res.status(200).json({
                message: 'Here are the results we found for your query',
                data: matches
            });
        } else {
            res.status(404).json({
                message: 'No districts found matching your query'
            });
        }
    } catch (err) {
        console.error(err); //dev-log
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


module.exports = {
                     getAllDistricts,
                     searchDistricts
                };
