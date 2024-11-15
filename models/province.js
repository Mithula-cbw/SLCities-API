const db = require('../config/db');

//get all provinces

//get province by ID
const getProvinceById = (id) => {
    return new Promise((resolve, reject)=>{
       db.query('SELECT * from provinces WHERE id = ?', [id], (error, result)=>{
        if(error) return reject(error);
        resolve(result);
       }) 
    });
}

module.exports = {
                    getProvinceById
                }