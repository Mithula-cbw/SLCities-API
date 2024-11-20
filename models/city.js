const db = require('../config/db');

//get all cities
const getAllCities = ()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * from cities' , (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

//get city by id
const getCityById = (id) => {
    const query = `SELECT * FROM cities WHERE id = ?`; // query
    
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

// Search cities (limit 10) --more specific query to sort for user friendly use
const searchCities = (searchString, limit) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT id, name
            FROM cities
            WHERE name LIKE CONCAT(?, '%')  -- Match cities starting with search string
            OR name_si LIKE CONCAT(?, '%')  -- Match cities starting with search string (in Sinhala)
            ORDER BY 
                CASE
                    WHEN name LIKE CONCAT(?, '%') THEN 0  -- Prioritize names that start with the search string
                    WHEN name_si LIKE CONCAT(?, '%') THEN 1
                    ELSE 2  -- Fall back to those that contain the search string anywhere
                END
            LIMIT ?;
        `;
        db.query(query, [searchString, searchString, searchString, searchString, limit], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

// Create a city
const createCity = (city) => {
    return new Promise((resolve, reject) => {
        const {
            district_id = null, // Optional field, default to null
            name = null,        // Optional field, default to null
            name_si = null,     // Optional field, default to null
            name_ta = null,     // Optional field, default to null
            postcode = null,    // Optional field, default to null
            latitude = null,    // Optional field, default to null
            longitude = null    // Optional field, default to null
        } = city;

        const query = `
            INSERT INTO cities 
            (district_id, name, name_si, name_ta, postcode, latitude, longitude) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [district_id, name, name_si, name_ta, postcode, latitude, longitude], (error, result) => {
            if (error) return reject(error);
            resolve({ message: 'City created successfully!', cityId: result.insertId });
        });
    });
};


module.exports = {
                    getAllCities,
                    getCityById,
                    searchCities,
                    createCity
                };   