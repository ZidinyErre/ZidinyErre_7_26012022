const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

//TODO Mets les images ici aussi
//    "nom" : "Roronoa", 
// "prenom" : "Zoro",
// "email" : "roronoazoro@gmail.com",
// "password": "ro20,;",
// "service" : "Lead Developpeur",
// "role" : "average user "

// TODO J'ai peut être trop augmenté le temps de login
class UserModels{
    constructor(){

    }
    signup(slqInserts){
        let sql = 'INSERT INTO user SET ?';
        sql = mysql.format(sql,slqInserts);
        return new Promise((resolve, reject) =>{
            db.query( sql , function(err, result){
                if (err) reject({error: 'Erreur dans l\'inscription'});
                resolve({message : 'Utilisateur créé !'});
            })
        })
    }

    login(sqlInserts, password){
        let sql = 'SELECT * FROM user WHERE email = ?' ;
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query( sql, function(err,result){
                
                if (err) reject({ err });
                if (!result[0]){
                    reject({error : 'Utilisateur introuvable !'});
                } else {
                    bcrypt.compare(password, result[0].password)
                    .then(valid => {
                        if (!valid) return reject({ error : 'Mots de passe incorrect '});
                        resolve({
                            
                            userId : result[0].id,
                            token : jwt.sign(
                                {userId: result[0].id},
                                process.env.ACCESS_TOKEN_SECRET,
                                {expiresIn: '300s'}
                            ),
                            refreshToken : jwt.sign(
                                {userId: result[0].id},
                                process.env.REFRESH_TOKEN_SECRET,
                                {expiresIn: '72h'}
                            ),
                            message: 'Bonjour et bienvenue!'
                            
                        });
                        // console.log(valid[0].userId);
                        // console.log(token.userId);

                    })
                    .catch(error => reject({error}));
                }
            })
        })

    }

    
    updateUser(sqlInserts){
        let sql = 'UPDATE user SET nom = ?, prenom = ?, password = ?, service = ?, role = ? WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query( sql, function(err,result){
                if (err) return reject({error : 'Utilisateur non modifié !'});
                resolve ({message : 'Utilisateur modifié !'});
            })
        })
    };

    getOneUser(sqlInserts) {
        let sql = 'SELECT * FROM user WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if(err) return reject({ error : 'Page introuvable'});
                if ([] === result) {
                    resolve({err : ' Utilisateur introuvable !'});
                }else{
                    resolve(result);
                }
            }) 

        })
    };

    deleteUser(sqlInserts){
        let sql = 'DELETE FROM user WHERE id = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) reject({error: 'Echec de l\'opération!'});
                resolve({message : 'Utilisateur supprimé !'});            
            })
        })
    }


}



module.exports = UserModels;
