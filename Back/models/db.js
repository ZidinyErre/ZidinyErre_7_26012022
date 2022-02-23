const mysql = require('mysql');
const dbConfig = require('../config/db.config');


const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASES
});


connection.connect((err) =>{
    if(err){
        console.error('error connecting:' + err.stack)
        return
    }
    console.log('MySQL connected...');
});

module.exports = connection
