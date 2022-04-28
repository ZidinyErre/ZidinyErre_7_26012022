const multer = require('multer');
const path = require('path');
// Middleware qui va principalement permettre de récupérer et gérer les images
// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png',
// };
console.log("Test : ");

const storage = multer.diskStorage({

    destination : (req, file, callback) => {
        callback(null , 'images');
    },
    filename : (req, file, callback) => {
        // console.log("Test : " + `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
module.exports = multer({storage : storage});

// const multer = require('multer');
// const path = require('path');
// // Middleware qui va principalement permettre de récupérer et gérer les images
// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png',
// };

// const storage = multer.diskStorage({
//     destination : (req, file, callback) => {
//         callback(null , 'images');
//     },
//     filename : (req, file, callback) => {
//         const extPath = path.extname(`images/${file.originalname}`);
//         const name = file.fieldname.split(' ').join('_').split(extPath).join('');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, `${name + Date.now()}.${extension}`);
//     }
// });

// module.exports = multer({storage : storage}).single('image');