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
        let sql = 'SELECT COUNT(id) FROM user WHERE id=?';
        sql = mysql.format(sql, sqlInserts);
        db.query(sql, function(err, result){
            if (err) reject(res.status(403).json({error: 'Requête non autorisé'}));
            if (result[0]['COUNT(id)'] !== 1) {
                throw 'Token invalide';
              } else {
                next();
            }
        })
    }catch (error){
        res.status(401).json({error: error | 'Requête non authentifié !'});
        console.log(error);
    }
};

