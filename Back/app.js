const express = require('express');
const mysql = require('mysql');
const db = require('./config/db');
const path = require('path');
const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    next();
});
app.options('/*', (_, res) => {
    res.sendStatus(200);
});

app.use(express.urlencoded({ extended : true}));
app.use(express.json());


app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));
 
//app.get('/createdb', (req, res) => {
//    let sql = 'CREATE DATABASE groupomania';
//    db.query(sql, (err,result) => {
//       if(err) throw err ;
//        console.log(result);
//        res.send('Database created..')
//    });
//});


module.exports = app;