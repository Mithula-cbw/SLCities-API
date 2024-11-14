const { port } = require('./config/config')
const app = require('./app');
const db = require('./config/db');

db.connect((error)=>{
    if(error){
        console.error("error connecting to the database", error.message);
    }else{
        console.log("db connection successful");
        app.listen(port, ()=>{
            console.log("server listening on", process.env.PORT);
        })
    }
});