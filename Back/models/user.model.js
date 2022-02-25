const db = require("./db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// // constructor
// const User = function(user){
//     this.id = user.id;
//     this.nom = user.nom;
//     this.prenom = user.prenom;
//     this.email = user.email;
//     this.password = user.password;
//     this.service = user.service;
//     this.role = user.role;
// };

// User.create = (newUser, result) => {
//     db.query("INSERT INTO user SET ?", newUser, (err,res) =>{
//         if (err){
//             console.log("error: ", err);
//             result(err,null);
//             return;
//         }

//     });
// };

exports.signup = (req, res, next) => {
    const user = req.body
    bcrypt.hash(user.password,10)
    .then((hash) => {
        user.password = hash
        db.query("INSERT INTO user SET ?", user, (err,res) =>{
            if(err) {
                console.log(err);
                return res.status(400).json("erreur");
            }
            return res.status(201).json({message : 'Profil créé !'});
        });
        
    });

};

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
