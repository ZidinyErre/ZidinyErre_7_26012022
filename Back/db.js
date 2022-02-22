const mysql = require('mysql');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2525,pasM!",
    database: "groupomania"
});


db.connect((err) =>{
    if(err){
        console.error('error connecting:' + err.stack)
        return
    }
    console.log('MySQL connected...');
});

module.exports = db
