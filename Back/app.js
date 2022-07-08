const express = require('express');
const path = require('path');
const lodash = require('lodash');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
let corsOptions = {
    origin: 'http://localhost:8080/'
}

// const { authenticated } = require('./middlewares/auth');
const app = express();

const userRoutes = require('./routes/user-route');
const postRoutes = require('./routes/post-route');
const commentRoutes = require('./routes/comment-route');
const refreshRoutes = require('./routes/refresh-route');

// app.use(fileUpload());

app.use(fileUpload({
    createParentPath: true
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
    next();
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.options('/*', (_, res) => {
//     res.sendStatus(200);
// });

// app.use(express.urlencoded({ extended : true}));
// app.use(express.json());


app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/', refreshRoutes);




app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));
 
app.use(morgan('dev'));


module.exports = app;