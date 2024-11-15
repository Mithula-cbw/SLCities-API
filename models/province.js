const db = require('../config/db');

//get all provinces
const getAllProvinces = ()=>{
    return new Promise((resolve,reject)=>{
        db.query('SELECT * from provinces' , (error, result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    });
}

//get province by ID
const getProvinceById = (id) => {
    return new Promise((resolve, reject)=>{
       db.query('SELECT * from provinces WHERE id = ?', [id], (error, result)=>{
        if(error) return reject(error);
        resolve(result);
       }) 
    });
}

//get all districts of a province (by province id)
const getDistrictsOfProvince = (id) => {
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM districts WHERE province_id = ?', [id], (error, results)=>{
            if(error) return reject(error);
            resolve(results);
        })
    });
}



module.exports = {
                    getAllProvinces,
                    getProvinceById,
                    getDistrictsOfProvince
                }