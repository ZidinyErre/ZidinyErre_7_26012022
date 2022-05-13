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

}

module.exports = CommentsModels;