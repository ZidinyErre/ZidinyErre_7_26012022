const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('express-session');
require('dotenv').config();

exports.signup = async (req, res) => {
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
                res.status(200).json({message: 'Bonjour et bienvenue!'});
                console.log(token);
                console.log(bResult);

            }
        })
    })
};

exports.logout = (req, res) => {
const {token , decodedToken} = require('../middlewares/auth')
    if (token === decodedToken) {
        delete(token);
        // res.redirect('/');
        res.status(200).json({message: 'Déconnecté'});
    }else{
        res.status(400).json({error: ' Problème lié à la connexion'});
        console.log(err);
    }
};

exports.deleteUser = (req, res) => {

};

exports.getUsers = (req, res, next) => {

};

exports.updateUser = (req, res, next) => {

};

exports.getOneUser = (req, res, next) => {

};
