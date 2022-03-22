const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.createPost = (req, res) => {
    const {user_id, user_service, comment}= req.body;
    const image_adress = `${req.protocol}:\\${req.get('host')}/images/${req.file.filename}`;
    // const userId = 'SELECT * FROM user JOIN  post ON user.user_id = user.id';
    db.query('INSERT INTO post SET ?', [user_id, image_adress, user_service, comment], (err, result) =>{
        if (err) {
            res.status(400).json({error : 'Echec du post!'});
            console.log(err);
            
        } else {
            res.status(200).json({ message : 'Post créer !!'});
            console.log(result);
        }
    })
}

exports.updatePost = (req, res) => {
}

exports.deletePost = (req, res) => {
}

exports.getAllPost = (req, res) => {
}

exports.getOnePost = (req, res) => {
}

exports.likesPost = (req, res) => {
}

exports.lovesPost = (req, res) => {
}

exports.congratsPost = (req, res) => {
}