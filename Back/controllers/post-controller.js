const db = require("../config/db");
const jwt = require('jsonwebtoken');
const Post = require('../models/post-model');
require('dotenv').config();

exports.create = (req, res) => {
    Post.create(req.body)
        .then(response => res.status(201).json({response, message: "Post créé avec succès"}))
        .catch(error => res.status(400).json(error.message));
}; 

// exports.create = (req, res) => {
//     const { user_service, comment}= req.body;
//     const image_adress = `${req.protocol}:\\${req.get('host')}/images/${req.file.filename}`;
//     const userId = db.query('SELECT * FROM user JOIN  post ON user.user_id = user.id');
//     db.query('INSERT INTO post SET ?', {user_id : userId, image_adress : image_adress , user_service : user_service, comment : comment }, (err, result) =>{
//         if (err) {
//             res.status(400).json({error : 'Echec du post!'});
//             console.log(err);
            
//         } else {
//             res.status(200).json({ message : 'Post créer !!'});
//             console.log(result);
//         }
//     })
// }; 

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