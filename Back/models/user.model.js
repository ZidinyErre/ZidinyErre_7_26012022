const db = require("./db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { USER } = require("../config/db.config");


exports.signup = (req, res, next) => {
    const {nom, prenom, email, password, service, role} = req.body
    const sql = `INSERT INTO user (nom, prenom, email, password, service, role) VALUES (?,?,?,?,?,?)`

    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            req.password = hash
            db.query( sql, [nom,prenom,email,password,service,role], (err, result) =>{
                if(err) {
                    console.log(err);
                    return res.status(400).json({error: 'Utilisateur non sauvegardé '})
                }
                else{
                    console.log(result);
                    return res.status(201).json({message : 'Profil créé !'})
                } 
            });
        })
        .catch(error => res.status(500).json({error: 'Echec de l\'inscription !'}));
        
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
