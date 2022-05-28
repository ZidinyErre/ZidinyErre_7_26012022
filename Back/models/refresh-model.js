const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();


class RefreshModel{
    constructor(){

    }
    refresh(sqlInserts, password){
        let sql = 'SELECT * FROM user WHERE email = ?' ;
        sql = mysql.format(sql, sqlInserts);
        // console.log(sqlInserts);
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
                            acessToken : jwt.sign(
                                {userId: result[0].id},
                                process.env.ACCESS_TOKEN_SECRET,
                                {expiresIn: '72h'}
                            ),
                            
                            message: 'Vous êtes restez connecté!'
                            
                        });
                        // console.log(valid[0].userId);
                        console.log(accessToken);
    
                    })
                    .catch(error => reject({error}));
                }
            })
        })
    
    }
    
}


module.exports = RefreshModel;
