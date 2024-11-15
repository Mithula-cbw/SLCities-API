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

module.exports = {
                    getAllDistricts
                }