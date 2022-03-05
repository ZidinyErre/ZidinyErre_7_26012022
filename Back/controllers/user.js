const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/User');

// exports.signup = async(req, res, next) => {
        
//     try{
//         const {nom, prenom, email, password, service, role} = req.body;
//         const hash = await bcrypt.hash(password,10);
//         await db('user').insert({nom: nom, prenom: prenom, email: email, hash: hash, service: service, role: role});
//         return res.status(201).json({message : 'Profil créé !'})
//     }catch(e){
//         console.log(e);
//         return res.status(400).json({error: 'Utilisateur non sauvegardé '})
        
//     }
        
// };

exports.signup = async(req, res, next) => {

    const user = new User(nom, prenom, email, password, service, role);

    db.query( user, (err, result) =>{
        if(err) {
            console.log(err);
        }
        else{
            res.send( 'Profil créé !');
            console.log(result);

        } 
    });
    
        
        
};

// exports.signup = (req, res, next) => {
// const {nom, prenom, email, password, service, role} = req.body
// const sql = `INSERT INTO user (nom, prenom, email, password, service, role) VALUES (?,?,?,?,?,?)`

//     db.query( sql, [nom,prenom,email,password,service,role], (err, result) =>{
//         if(err) {
//             console.log(err);
//         }
//         else{
//             res.send( 'Profil créé !');
//             console.log(result);

//         } 
//     });
// };


// exports.signup = (req, res, next) => {
//     const user = req.body
//     const sql = `INSERT INTO user (nom, prenom, email, password, service, role) VALUES (?,?,?,?,?,?)`
//     const password = req.body.password;
//     bcrypt.hash(password, 10)
//         .then((hash) => {
//             password = hash
//             db.query( sql, user, (err, result) =>{
//                 if(err) {
//                     console.log(err);
//                     return res.status(400).json({error: 'Utilisateur non sauvegardé '})
//                 }
//                 else{
//                     console.log(result);
//                     return res.status(201).json({message : 'Profil créé !'})
//                 } 
//             });
//         })
        
// };





exports.login = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};

exports.getUsers = (req, res, next) => {

};

exports.updateUser = (req, res, next) => {

};

exports.getOneUser = (req, res, next) => {

};
