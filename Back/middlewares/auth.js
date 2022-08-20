const jwt = require('jsonwebtoken');
const db = require('../config/db');
const mysql = require('mysql');
require('dotenv').config();

// Middleware qui va permettre d'authentifié l'utilisateur et de le permettre d'agir ou non
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
        const userId = decodedToken.userId;
        let sqlInserts = [userId];

        let sql1 = 'SELECT * FROM user WHERE id= ?';
        sql1 = mysql.format(sql1, sqlInserts);
        return new Promise((resolve , reject) =>{
            db.query(sql1, function(err,result){
                let role = result[0].role;

                console.log(sql1 + "sql1");

                console.log(" result3 " + ""  + result[0]);
                console.log("role" + ""  + role);
                console.log(" result4" + ""  + result);

                let sql = 'SELECT COUNT(id) FROM user WHERE id=?';
                sql = mysql.format(sql, sqlInserts);

                db.query(sql, function(err, result){
                    if ( result[0]['COUNT(id)'] == 1 || role === 1) {
                        resolve(next())
                    } else {
                        res.status(400).json({error: 'Vous n ête pas connecté !'});
                    }
                    console.log("sql" + ""  + sql)
                    console.log(" userId" + ""  + result[0]['COUNT(id)']);
                    console.log(" result1 " + ""  + result[0]);
                    console.log(" result2" + ""  + result);
                    console.log("role2" + ""  + role);


        
                })
        
                console.log("on est dans l'auth" + ""  + userId);
        
            })
        })

        
    }catch (error){
        res.status(401).json({error: 'Requête non authentifié !'});
    }
};



// res.status(401).json({error: error | 'Requête non authentifié !'});