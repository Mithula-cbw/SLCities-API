const districtModel = require('../models/district');
const provinceModel = require('../models/province');

// Get all districts
const getAllDistricts = async (req, res) => {
    try {
        const allDistricts = await districtModel.getAllDistricts();

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

//get district by id
const getDistrictById = async (req, res) =>{
    const id = req.params.id;

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

//get the province of a district
const getProvinceOfDistrict = async(req, res) =>{
    const district_id = req.params.id;
    try{
    const district = await districtModel.getDistrictById(district_id);

    if (!district || district.length === 0) {
        return res.status(404).json({
            msg: "District not found"
        });
    }

    const province_id = district[0].province_id;

    if (!province_id) {
        return res.status(404).json({
            msg: "District doesn't have a province associated"
        });
    }

    console.log(district); //dev-log

    const province = await provinceModel.getProvinceById(province_id);

    if(province && province.length > 0){
        res.status(200)
        .json({
            msg: `here is the province of ${district[0].name}`,
            data: province[0]
        })
    }else{
        res.status(404)
        .json({
            msg: "couldn't find province"
        })
    }
    }catch(err){
        res.status(500)
        .json({
            msg: "error processing your request",
            error: err.message
        })
    }

}

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
            //add a 'is this what you mean?' function //dev-future
            res.status(404).json({
                message: 'No districts found matching your query',                
                suggestion: "Is this what you mean?"
            });
        }
    } catch (err) {
        console.error(err); //dev-log
        res.status(500).json({ message: 'An error occurred while processing your request' });
    }
};


module.exports = {
                     getAllDistricts,
                     getDistrictById,
                     getProvinceOfDistrict,
                     searchDistricts
                };
