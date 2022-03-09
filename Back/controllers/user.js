const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/user');

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

// exports.signup = async(req, res) => {

    // if (await db.User.findOne({ where: { email: params.email} })) {
    //     throw 'l\'email' + params.email + 'existe déjà';
    // }
    // const user = new db.User(params);
    
    // user.passwordHash = await bcrypt.hash(params.password, 10);
    
    // await user.save();

    // console.log(user);


        
    // try{
    //     const {nom, prenom, email, password, service, role} = req.body;
    //     const hash = await bcrypt.hash(password,10);
    //     await db('user').insert({nom: nom, prenom: prenom, email: email, hash: hash, service: service, role: role});
    //     return res.status(201).json({message : 'Profil créé !'})
    // }catch(e){
    //     console.log(e);
    //     return res.status(400).json({error: 'Utilisateur non sauvegardé '})
        
    // }
        
// };

// exports.signup = (req, res, next) => {

//         bcrypt.hash(req.body.password,10)
//             .then( hash => {
//                 db.query( (err,result) =>{
//                 const user = new User({
//                     nom: req.body.nom, 
//                     prenom: req.body.prenom,
//                     email: req.body.email,
//                     password: hash, 
//                     service: req.body.nom,
//                     role: req.body.nom
//                 });
//                 if(err) {
//                             console.log(err);
//                         }
//                         else{
//                             res.send( 'Profil créé !');
//                             console.log(result);
                
//                         } 
//             });
        
//             })
//             .catch(error => res.status(500).json({error: 'Echec de l\'inscription !'}));


//     // db.query( user, (err, result) =>{
//     //     if(err) {
//     //         console.log(err);
//     //     }
//     //     else{
//     //         res.send( 'Profil créé !');
//     //         console.log(result);

//     //     } 
//     // });
    
        
        
// };

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
