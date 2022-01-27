const express = require('express');
const mysql = require('mysql');

const app = express();

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
//app.get('/createdb', (req, res) => {
//    let sql = 'CREATE DATABASE groupomania';
//    db.query(sql, (err,result) => {
//       if(err) throw err ;
//        console.log(result);
//        res.send('Database created..')
//    });
//});


module.exports = app;