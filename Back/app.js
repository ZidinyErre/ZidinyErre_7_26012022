const express = require('express');
const mysql = require('mysql');
const db = require('./models/db');

const app = express();


//app.get('/createdb', (req, res) => {
//    let sql = 'CREATE DATABASE groupomania';
//    db.query(sql, (err,result) => {
//       if(err) throw err ;
//        console.log(result);
//        res.send('Database created..')
//    });
//});


module.exports = app;