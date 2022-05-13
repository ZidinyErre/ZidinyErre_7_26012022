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
