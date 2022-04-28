const db = require("../config/db");
const jwt = require('jsonwebtoken');
const PostsModels = require('../models/post-model');
require('dotenv').config();

let postModels = new PostsModels();


exports.createPost = (req, res) => {
    let  user_id = req.body.user_id;
    let  user_service = req.body.user_service;
    let  comment  = req.body.comment;

    // console.log("c'est le log du post" + req.body);
    // const image_adress = `${req.protocol}:\\${req.get('host')}/images/${req.file.filename}`;
    let sqlInserts = [user_id, user_service, comment];
    // , image_adress
    // if (!sqlInserts.image_adress) {
    //     sqlInserts = [post];
    // }
    postModels.createPost(sqlInserts)
    .then((response) => {
        res.status(201).json(JSON.stringify(response))
    })
    .catch( (error) => {
            res.status(400).json(error)
    });
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

// exports.updatePost = (req, res) => {
// }

// exports.deletePost = (req, res) => {
// }

// exports.getAllPost = (req, res) => {
// }

// exports.getOnePost = (req, res) => {
// }

// exports.likesPost = (req, res) => {
// }

// exports.lovesPost = (req, res) => {
// }

// exports.congratsPost = (req, res) => {
// }