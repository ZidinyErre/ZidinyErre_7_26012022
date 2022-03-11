const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.signup = async (req, res, next) => {
    const {nom, prenom, email, password, service, role} = req.body;
    let hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
        db.query( 'INSERT INTO user SET ?', {nom : nom, prenom : prenom, email : email, password : hashedPassword, service : service, role : role}, (err, result) =>{
            if(err) {
                res.status(400).json({error: 'Utilisateur non sauvegardé ! L email est probablement déjà utilisé!'});
                console.log(err);
            }
            else{
                res.status(201).json({ message: 'Utilisateur créé !' });
                console.log(result);
    
            } 
        });
};


// exports.login = (req, res) => {
//     const {email, password} = req.body;
//     const userEmail = 'SELECT email FROM user WHERE email = ? ';
//     const userPassword = 'SELECT password FROM user WHERE password = ?';
//     const userId = 'SELECT id FROM user WHERE id = ?'
//     db.query( () =>{
//         if(userEmail !==  email){
//             return res.status(401).json({error : 'Utilisateur introuvable'});
//         }
//         bcrypt.compare(password, userPassword)
//             .then( valid => {
//                 if(!valid){
//                     return res.status(401).json({ error: 'Mot de passe incorrect !' });
//                 }
//             })
//             res.status(200).json({
//                 userId: userId,
//                 token: jwt.sign(
//                     {userId: userId},
//                     process.env.ACCESS_TOKEN_SECRET,
//                     {expiresIn: '24h'}
//                 )
//             })
//             .catch( res.status(500).json({ error: 'Problème lié à la connexion de l\'utilisateur !' }));
//     })


// };

exports.login = (req, res) => {
    const {email,password} = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email],  (err, result) =>{
        if(err){
            res.status(500).json({error: 'Echec de l\'opération'});
            console.log(err);
        }
        if(!result[0]){
            res.status(400).json({error: 'Email introuvable!'});

        }
        bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
            if(bErr){
                res.status(500).json({error: 'Echec de l\'opération lié au mots de passe'});
                console.log(bErr);
            }
            if(bResult){
                const token = jwt.sign(
                    {userId: result[0].id},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '24h'}
                )
                res.status(200).json({message: 'Bonjour!'});
                console.log(bResult);
            }
        })
    })
};

exports.logout = (req, res) => {

    
};

exports.deleteUser = (req, res) => {

};

exports.getUsers = (req, res, next) => {

};

exports.updateUser = (req, res, next) => {

};

exports.getOneUser = (req, res, next) => {

};
