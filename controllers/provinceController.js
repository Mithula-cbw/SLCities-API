const provinceModel = require('../models/province');

// Get All districts
const getAllProvinces = async (req, res) => {
    try {
        const AllProvinces = await provinceModel.getAllProvinces();

        if (AllProvinces && AllProvinces.length > 0) {
            res.status(200).json({
                message: `Found ${AllProvinces.length} districts`,
                data: AllProvinces
            });
        } else {
            return res.status(404).json({
                message: "No provinces found"
            });
        }
    } catch (err) {
        console.error("Error fetching provinces:", err);  // dev-log
        return res.status(500).json({
            message: "An error occurred while fetching provinces",
            error: err.message || err
        });
    }
};

//get Province by id
const getProvinceById = async (req, res) =>{
    const id = req.params.id;
    const isGetAll = req.query.getAll === "true";

    try{
        const province = await provinceModel.getProvinceById(id);

        if(province && province.length > 0){
            if (isGetAll) {
                const allDistrictsOfProvince = await provinceModel.getDistrictsOfProvince(id);

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
                    msg: `found province`,
                    data: province[0]
                });
            }
        }else{
            return res.status(404)
            .json({
                msg: "no such province exists",
            })
        }
    }catch(err){
        return res.status(500)
        .json({
            msg : "there was an error processing your request",
            error : err.message
        });
    }
}

//get Districts of a province
const getDistrictsOfProvince = async (req, res) =>{
    const id = req.params.id;

    try{
        const districts = await provinceModel.getDistrictsOfProvince(id);

        if(districts && districts.length > 0){
            res.status(200)
            .json({
                msg: 'Districts of the province',
                data: districts
            })
        }else{
            return res.status(404)
            .json({
                msg: 'no districts found for query'
            })
        }
    }catch(err){
        return res.status(500)
        .json({
            msg: 'error processing your request',
            error: err.message
        })
    }
}

//get District Count Of a Province
const getDistrictCountByProvince = async(req, res) =>{
    const id = req.params.id;

    try{
        const count = await provinceModel.getDistrictCountByProvince(id);

        if(count && count > 0){
            res.status(200)
            .json({
                msg: `There are ${count} Districts in this province`,
                count: count
            });
        }else{
            return res.status(404)
            .json({
                msg: `No Districts found for this province`
            });
        }
    }catch(err){
        return res.status(500)
        .json({
            msg : "there was an error processing your request",
            error : err.message
        });
    }
}

module.exports = {
                    getAllProvinces,
                    getProvinceById,
                    getDistrictsOfProvince,
                    getDistrictCountByProvince
                };