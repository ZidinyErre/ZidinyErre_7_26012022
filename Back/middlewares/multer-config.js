

const multer = require('multer');
const path = require('path');
const express = require('express');

const app = express();
// Middleware qui va principalement permettre de récupérer et gérer les images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
};
    

const storage = multer.diskStorage({

    destination : (req, file, callback) => {
        
        callback(null ,'images');
    },
    filename : (req, file, callback) => {
        // const extPath = path.extname(`images/${file.originalname}`);
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        // console.log(extPath + "extPath1");
        console.log(name + "name1");
        console.log(extension + "extension1");
        // callback(null, `${name + Date.now()}.${extension}`);
        callback(null, name + Date.now() + '.' + extension);

    }
    
});



// module.exports = multer({storage : storage});
module.exports = multer({storage : storage}).any('image_adress');