const express = require('express');
const path = require('path');
const lodash = require('lodash');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const app = express();

const userRoutes = require('./routes/user-route');
const postRoutes = require('./routes/post-route');

app.use(fileUpload({
    createParentPath: true
}));

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
 
app.use(morgan('dev'));


module.exports = app;