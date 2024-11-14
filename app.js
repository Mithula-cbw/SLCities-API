const express = require('express');
const app = express();
const { printReq } = require('./middleware/helper');

//global middlewares
app.use('/',printReq);


app.get('/', (req,res)=>{
    res.send("i am listening");
})

module.exports = app;
