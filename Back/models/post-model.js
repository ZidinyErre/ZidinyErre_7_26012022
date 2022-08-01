const db = require("../config/db");
const mysql = require('mysql');
const fs = require('fs');
const {join, resolve} = require('path');
const { reject } = require("lodash");
const { rejects } = require("assert");

// Il faut vérifier que chaque partie marche avec et sans images !!!

class PostsModels{
    constructor(){

    }
    testPost(req) {
        return new Promise((resolve, reject) => {
            if (!sqlInserts.annotation) {
                return reject({ message:  'Nope mon pote'})
            }
            
            if (req.image_adress && req.image_adress === 22) {
                reject({})
            }

            let sql = 'INSERT INTO post  SET user_id = ? , user_service = ? ,   annotation = ?';
            let message = '';
            if (sqlInserts.image_adress) {
                sql += ', image_adress = ?';
                message = "Post  avec photo créé avec succès"
            } else {
                message = "Post  sans photo créé avec succès"
            }

            db.query(sql, function(err, result){
                if (err) throw err;
                resolve({  message })
            })

        })
    }
    /**
     * Création d'un post
     * champs required 'annotation', ..
     */

    // Youtube DevAdventure
    // Youtube WebDevSimplified
    // TODO check Sequelize
    createPost( sqlInserts){
        console.log(sqlInserts.annotation + 'annot');



        if (sqlInserts.annotation === undefined) {
            return new Promise((resolve,reject) => {
            reject({ message:  'Veuillez remplir la partie commentaire de cette publication.'})
            })
        } else if (sqlInserts.image_adress ) {
            let sql = 'INSERT INTO post  SET user_id = ? , user_service = ? , image_adress = ? ,  annotation = ?';
            sql= mysql.format(sql, sqlInserts);
            return new Promise((resolve, reject) => {
                db.query(sql, function(err, result){
                    if (err) throw err;
                    resolve({  message: "Post  avec photo créé avec succès" })
                    console.log(sql+ "sql1");
                })
            })
        } else {
            let sql = 'INSERT INTO post  SET user_id = ? , user_service = ? ,   annotation = ?';
            sql = mysql.format(sql, sqlInserts);
            return new Promise((resolve, reject) => {
                db.query(sql, function(err, result){
                    if (err) throw err;
                    resolve({  message: "Post  sans photo créé avec succès" })
                    console.log(sql+ "sql2");
                })
            })
        }
 
        // return new Promise((resolve, reject) => {

        //     if (!sqlInserts.annotation) {
        //           return reject({ message:  'Veuillez remplir la partie commentaire de cette publication.'})
        //         }

        //     let sql = '';
        //     let message = '';
        //     if (sqlInserts.length === 4){
        //         sql = 'INSERT INTO post  SET user_id = ? , user_service = ? , image_adress = ?,  annotation = ?';
        //         message = "Post  avec photo créé avec succès"
        //     } else {
        //         sql = 'INSERT INTO post  SET user_id = ? , user_service = ? ,   annotation = ?';
        //         message = "Post  sans photo créé avec succès"
        //     }
        //     sql = mysql.format(sql, sqlInserts);
        //     db.query(sql, function(err, result){
        //         if (err) throw err;
        //         resolve({  message })
        //         console.log(sql + 'dbquery');
    
        //     })
        // })


        

            



            

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
    // DELETE FROM groupomania.post WHERE id= 7 AND user_id= 30 AND post.image_adress IS NULL; Permets d'avoir un post sans image 
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