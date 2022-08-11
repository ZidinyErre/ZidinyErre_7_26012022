const db = require('../config/db');
const mysql = require('mysql');

class CommentsModels{
    constructor(){

    }
    createComment(sqlInserts){
        let sql = 'INSERT INTO comment SET post_id = ?, user_id = ?, comment = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query(sql ,function(err, result) {
                if (err) throw err;
                resolve({  message: "Commentaire créé avec succès" })
            })
        })

    }
    getOneComment(sqlInserts){
        let sql = 'SELECT * FROM comment WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) throw err;
                resolve(result)
            })
        })
    }

    deleteComment(sqlInserts){
        let sql = 'DELETE FROM comment WHERE id = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) reject({error: 'Echec de l\'opération!'});
                resolve({message : 'Commentaire supprimé !'});            
            })
        })
    }

    likescomment(sqlInserts,liked){
        let sql1 = 'UPDATE comment SET  user_comment_like = ?,  like_comment_count =  like_comment_count+1 WHERE id = ?';
        sql1 = mysql.format(sql1, sqlInserts );
        let sql2 = 'UPDATE comment SET user_comment_like = ?,  like_comment_count =  like_comment_count-1 WHERE id = ?';
        sql2 = mysql.format(sql2,sqlInserts );
        return new Promise((resolve,reject) =>{
            console.log(liked);
            console.log(sql1);
            if (liked === true) {
                db.query(sql1, function(err, result){
                    if (err) return reject({err : "La Fonction d'ajout de like a échoué" + err});
                    resolve({message: 'Like commentaire ajouté'})
                console.log(sql1 + "222");
                })
                
            } else {
                db.query(sql2, function(err, result){
                    if (err) return reject({err : "La Fonction de suppression de like a échoué"});
                    resolve({message: 'Like commentaire supprimé'})
                })
            }
           
        })
    }

}

module.exports = CommentsModels;