const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "TWVzam9saWVzZmxldXJzYmxldQ==",
});

db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('MySQL connected...');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE groupomania';
    db.query(sql, (err,result) => {
        if(err) throw err ;
        console.log(result);
        res.send('Database created..')
    });
});

module.exports = app;