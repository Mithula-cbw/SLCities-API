const db = require('../config/db');

//get all districts
const getAllDistricts = ()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * from districts' , (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

//get district by id
const getDistrictById = (id) => {
    const query = `SELECT * FROM districts WHERE id = ?`; // query
    
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

//get district by first letters (limit 10)
const searchDistricts = (searchString) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT id, name
            FROM districts
            WHERE name LIKE CONCAT('%', ?, '%')
               OR name_si LIKE CONCAT('%', ?, '%')
            LIMIT 10;
        `;
        db.query(query, [searchString, searchString, searchString], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};


module.exports = {
                    getAllDistricts,
                    getDistrictById,
                    searchDistricts
                }