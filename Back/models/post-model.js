const db = require("../config/db");
const mysql = require('mysql');

class PostsModels{
    constructor(){

    }
    createPost(sqlInserts){
        let sql = 'INSERT INTO post  SET user_id = ? , user_service = ? , comment = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) => {
            db.query(sql, function(err, result){
                if (err) throw err;
                resolve({  message: "Post créé avec succès" })
            })
        })

    }
}

module.exports = PostsModels;


// exports.create = (req, res) => {
//     const post = JSON.parse(req.body);
//     const image_adress = `${req.protocol}:\\${req.get('host')}/images/${req.file.filename}`;
//     db.promise().query( 'INSERT INTO post SET ?', [post, image_adress])
//     .then(response => JSON.stringify(response))
//     .catch(error => {throw error});


// };

// exports.create = (data) => {
//     const image_adress = `${req.protocol}:\\${req.get('host')}/images/${req.file.filename}`;
//     return db.connect(error => {
//         if (error) throw error;
//         return db.promise().query(
//             'INSERT INTO post SET ?', {user_id : data.userId, image_adress : image_adress , user_service : data.user_service, comment : data.comment }
//         )
//         .then(response => JSON.stringify(response))
//         .catch(error => {throw error});
//     });
    
// };