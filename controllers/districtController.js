//models
const districtModel = require('../models/district');
const provinceModel = require('../models/province');

//utils
const fuzzySearch = require('../utils/fusySearch')

//controllers
// Get all districts
const getAllDistricts = async (req, res) => {
    try {
        const allDistricts = await districtModel.getAllDistricts();

        if (allDistricts && allDistricts.length > 0) {
            res.status(200).json({
                message: `Found ${allDistricts.length} districts`,
                data: allDistricts
            });
        } else {
            return res.status(404).json({
                message: "No districts found"
            });
        }
    } catch (err) {
        console.error("Error fetching districts:", err);  // dev-log
        return res.status(500).json({
            message: "An error occurred while fetching districts",
            error: err.message || err
        });
    }
};

//get district by id
const getDistrictById = async (req, res) =>{
    const id = req.params.id;
    console.log("i got called");

    try{
        const district = await districtModel.getDistrictById(id);

        if(district && district.length > 0){
            res.status(200)
            .json({
                msg:"district found",
                data: district[0]
            })
        }else{
            res.status(404)
            .json({
                msg: "no such district exists",
            })
        }
    }catch(err){
        res.status(500)
        .json({
            msg : "there was an error processing your request",
            error : err.message
        })
    }
}

//get the province of a district --optionally get all associated districts with ?getAll=true
const getProvinceOfDistrict = async (req, res) => {
    const district_id = req.params.id;
    const isGetAll = req.query.getAll === "true";

    try {
        const district = await districtModel.getDistrictById(district_id);

        if (!district || district.length === 0) {
            return res.status(404).json({
                msg: "District not found"
            });
        }

        const { province_id } = district[0]; 

        if (!province_id) {
            return res.status(404).json({
                msg: "District doesn't have a province associated"
            });
        }

        const province = await provinceModel.getProvinceById(province_id);

        if (province && province.length > 0) {
            if (isGetAll) {
                const allDistrictsOfProvince = await provinceModel.getDistrictsOfProvince(province_id);

                // Only respond once, after logic is done
                return res.status(200).json({
                    msg: `Found province and its associated districts`,
                    data: {
                        province: province[0],
                        district_count: allDistrictsOfProvince.length,
                        districts: allDistrictsOfProvince
                    }
                });
            } else {
                return res.status(200).json({
                    msg: `Here is the province of ${district[0].name}`,
                    data: province[0]
                });
            }
        } else {
            return res.status(404).json({
                msg: "Couldn't find province"
            });
        }
    } catch (err) {
        return res.status(500).json({
            msg: "Error processing your request",
            error: err.message
        });
    }
};

//search district by string input --optionally get close suggestions by ?fusy=true
const searchDistricts = async (req, res) => {
    const searchString = req.query.q;
    const isFusy = req.query.fusy === 'true';

    if (!searchString) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    try {
        // Fetch the exact matches from the database
        const matches = await districtModel.searchDistricts(searchString);

        // If no matches are found, suggest fuzzy matches
        const suggestion = matches.length > 0 || !isFusy 
            ? null 
            : await fuzzySearchForDistricts(searchString, 1);

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
        res.status(404).json({
            message: `No match found for '${searchString}'. Did you mean one of these?`,
            suggestion: suggestion || []
        });

    } catch (err) {
        console.error(err); //dev-log
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};

//helper functions
//fusy search for finding similar names
const fuzzySearchForDistricts = async (searchString, limit) => {
    try {
        // Fetch all districts from the model
        const allDistricts = await districtModel.getAllDistricts();

        if (allDistricts && allDistricts.length > 0) {

            const fusyMatches = fuzzySearch(allDistricts, searchString);

            if (fusyMatches && fusyMatches.length > 0) {
                // Limit the results to the specified limit
                return fusyMatches.slice(0, limit);
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

module.exports = {
                     getAllDistricts,
                     getDistrictById,
                     getProvinceOfDistrict,
                     searchDistricts
                };
