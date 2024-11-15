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

module.exports = {
    getAllDistricts
};
