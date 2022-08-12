const CommentsModels = require('../models/comment-model');

let commentModels = new CommentsModels();

exports.createComment =  (req, res) => {
    const {post_id, user_id, comment } = req.body;
    let sqlInserts = [ post_id, user_id, comment];
    commentModels.createComment(sqlInserts)
    .then((result) => {
        res.status(201).json(JSON.stringify({result}));
    })
    .catch((err) =>{
            res.status(400).json({err});
    });

}

exports.getOneComment = (req, res) => {
    const commentId = req.params.id;
    let sqlInserts = [commentId];
    commentModels.getOneComment(sqlInserts)
    .then((result) => {
        res.status(200).json(JSON.stringify({result}));
    })
    .catch((err) =>{
        res.status(400).json({err})
    });
}

exports.deleteComment = (req, res) => {
    const commentId = req.params.id;
    let sqlInserts = [commentId];
    commentModels.deleteComment(sqlInserts)
    .then((result) => {
        res.status(200).json(JSON.stringify({result}));
    })
    .catch((err) =>{
        res.status(400).json({err})
    });
}

exports.likescomment = (req, res) => {
    let user_comment_like = req.body.user_id;
    let commentId = req.params.id;
    let liked = req.body.liked;
    let sqlInserts = [user_comment_like,commentId];

    commentModels.likescomment(sqlInserts,liked)
    .then((result) => {
        res.status(200).json(JSON.stringify({result}));
    })
    .catch((err) =>{
        res.status(400).json({err})
    });
}

