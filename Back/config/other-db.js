const mysql = require('mysql');
const otherConfig = require('./otherConfig-db');


const connection = mysql.createConnection({
    host: otherConfig.HOST,
    user: otherConfig.USER2,
    password: otherConfig.PASSWORD2,
    database: otherConfig.DATABASES
});


connection.connect((err) =>{
    if(err){
        console.error('error connecting (you are not in root):' + err.stack)
        return
    }
    console.log('MySQL connected...(you are in nouveau_user)');
});

module.exports = connection
