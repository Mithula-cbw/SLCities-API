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
