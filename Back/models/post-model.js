const db = require("../config/db");
const mysql = require('mysql');
const fs = require('fs');
const {join, resolve} = require('path');
const { reject } = require("lodash");



class PostsModels{
    constructor(){

    }
    createPost(sqlInserts1, sqlInserts2){
        if (!sqlInserts2.image_adress ) {
            let sql1 = 'INSERT INTO post  SET user_id = ? , user_service = ? ,  annotation = ?';
            sql1 = mysql.format(sql1, sqlInserts1);
            return new Promise((resolve, reject) => {
                db.query(sql1, function(err, result){
                    if (err) throw err;
                    resolve({  message: "Post sans photo créé avec succès" })
                })
            })
        } else {
            let sql2 = 'INSERT INTO post  SET user_id = ? , user_service = ? , image_adress = ? ,  annotation = ?';
            sql2 = mysql.format(sql2, sqlInserts2);
            console.log(sql2+ "sql2");
            return new Promise((resolve, reject) => {
                db.query(sql2, function(err, result){
                    if (err) throw err;
                    resolve({  message: "Post avec photo créé avec succès" })
                })
            })
        }
            
        

    }

    getAllPost(){
        let sql = 'SELECT id , user_id, creation_time, image_adress, user_service, annotation FROM post';
        return new Promise((resolve, reject)=>{
            db.query(sql, function(err, result){
                if (err) throw err;
                resolve (result)
            })
        }
    )}

    getOnePost(sqlInserts){
        // SELECT * FROM post WHERE id = ? INNER JOIN comment ON comment.post_id = post.id*
        // SELECT * FROM post WHERE id = ?
        let sql = ' SELECT * FROM post INNER JOIN comment ON comment.post_id = post.id WHERE post.id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                // Essaie de mise en place de condition pour savoir quoi faire si il n ' ya pas de commentaire au post (je pense qu'il faut inversé la logique de ce model)
                if ([].length == 0 ){
                    let sql = ' SELECT * FROM post WHERE id = ?';
                    sql = mysql.format(sql, sqlInserts);
                    db.query(sql, function(err, result){
                        if (err) throw err;
                        resolve({message : 'Pas de commentaire' + result})
                    })
                }
                if (err) return reject({err : "Utilisateur introuvable !"});
                resolve ( result )
            } )
            
        })

    }
    updatePost(sqlInserts1 , sqlInserts2){
        let sql1 = 'SELECT * FROM post WHERE id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        console.log('sql1'+sql1);

        return new Promise((resolve, reject) => {
            db.query(sql1, function(err, result){
                if (err) throw err;
                
                if (sqlInserts2[3] == result[0].user_id){
                    console.log('sqldél'+ sqlInserts2[3]);
                    console.log('resl'+ result[0].user_id);
                    let sql2 = "UPDATE  post SET  annotation = ?  , image_adress = ?  WHERE id = ? AND user_id = ? ";
                    sql2 = mysql.format(sql2, sqlInserts2);
                    db.query(sql2, function(err, result) {
                        console.log('sql2'+sql2);

                        if (err) throw err;
                        resolve({message : 'Post modifié avec succés !'})
                    }) 
                }else{
                    reject({error : 'fonction de modification indisponible !'})
                }
                
            })
        })
    

    }    

    deletePost(sqlInserts1 , sqlInserts2){
        let sql1 = 'SELECT * FROM post WHERE id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve, reject) => {

            db.query(sql1, function(err, result){
        
                console.log('yep' + sqlInserts2[1] + result[0].user_id + result[0].userId);
                if (err) throw err;
                if (sqlInserts2[1] == result[0].user_id){
                    const image = result[0].image_adress;
                    const filename = join(__dirname,'images',image);
                    fs.unlink(`images/${image}`, () =>{
                        console.log(filename);
                        console.log(image);
                        let sql2 = "DELETE FROM post WHERE id = ? AND user_id = ?";
                        sql2 = mysql.format(sql2, sqlInserts2);
                        db.query(sql2, function(err, result) {
                            if (err) throw err;
                            resolve({message : 'Post supprimé !'})
                        })
                    })
                }else{
                    reject({error : 'fonction suppression indisponible !'})
                }
            });
        })
        
    }
    
    likesPost(sqlInserts, liked){
        let sql1 = 'UPDATE post SET user_like = ?, like_count = like_count+1 WHERE id = ?';
        sql1 = mysql.format(sqlInserts, sql1);
        let sql2 = 'UPDATE post SET user_like = ?, like_count = like_count-1 WHERE id = ?';
        sql2 = mysql.format(sqlInserts, sql2);
        return new Promise((resolve,reject) =>{
            console.log(liked);
            console.log(sql1);
            if (liked === true) {
                db.query(sql1, function(err, result){
                    
                    if (err) return reject({err : "La Fonction d'ajout de like a échoué"});
                    resolve({message: 'Like ajouté'})
                    console.log(err);

                })
                
            } else {
                db.query(sql2, function(err, result){
                    if (err) return reject({err : "La Fonction de suppression de like a échoué"});
                    resolve({message: 'Like supprimé'})
                })
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