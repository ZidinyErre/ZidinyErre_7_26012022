const db = require("../config/db");
const mysql = require('mysql');


class PostsModels{
    constructor(){

    }
    createPost(sqlInserts){
        let sql = 'INSERT INTO post  SET user_id = ? , user_service = ? , image_adress = ? ,  comment = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) => {
            db.query(sql, function(err, result){
                if (err) throw err;
                resolve({  message: "Post créé avec succès" })
            })
        })

    }
    getAllPost(){
        let sql = 'SELECT id , user_id, creation_time, image_adress, user_service, comment FROM post';
        return new Promise((resolve, reject)=>{
            db.query(sql, function(err, result){
                if (err) throw err;
                resolve (result)
            })
        }
    )}
//getonepost marche pas
    getOnePost(sqlInserts){
        let sql = 'SELECT * FROM post WHERE id = ?';
        mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            if (err) return reject({err : "Utilisateur introuvable !"});
            resolve ( )
        })

    }

    deletePost(sqlInserts1 , sqlInserts2){
        let sql1 = 'SELECT * FROM post WHERE id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve, reject) => {
            if (err) throw err;
            if (sqlInserts2[1] == result[0].userId){
                let sql2 = "DELETE FROM post WHERE id = ? AND userId = ?";
                sql2 = mysql.format(sql2, sqlInserts2);
                db.query(sql2, function(err, result) {
                    if (err) throw err;
                    resolve({message : 'Post supprimé !'})
                })

            }else{
                reject({error : 'fonction indisponible !'})
            }
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