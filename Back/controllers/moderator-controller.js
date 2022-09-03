const PostsModels = require('../models/post-model');
require('dotenv').config();

let postModels = new PostsModels();

// Supprime une  Publication en tant que modérateur 
exports.deletePost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [postId , userId];
    console.log(postId);
    console.log(userId);
    postModels.deletePost(sqlInserts1, sqlInserts2)
    .then((response) => {
        res.status(200).json(JSON.stringify({response}))
    })
    .catch((error) =>{
        console.log(error);
        res.status(400).json({error})
    });
}