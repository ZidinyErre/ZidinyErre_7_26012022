const db = require("../config/db");
const jwt = require('jsonwebtoken');
const path = require("path");
const PostsModels = require('../models/post-model');
require('dotenv').config();

let postModels = new PostsModels();


exports.createPost = async (req, res) => {
    
    const {user_id, user_service, comment } = req.body;
    let image;
    let imagesUpload;

    if (!req.files) {
        res.send({
        status:false,
        message: 'Image non téléchargée'
        });
    }

    image = req.files.image_adress;
    imagesUpload = path.join(__dirname , "//..//images//",image.name );

    // imagesUpload = path.join(__dirname + "//.." );
    // imagesUpload = path.join(__dirname + "../images/" + image.name);
    // let image_adress = image;

    console.log(image);
    console.log(imagesUpload);
    console.log(__dirname);
    console.log(typeof(image));

    image.mv(imagesUpload, function (err){
        if (err) return res.status(500).send(err);

        let sqlInserts = [ user_id, user_service,  image.name, comment];
    
        // if (!sqlInserts.image_adress) {
        //     sqlInserts = [user_id, user_service, comment];
        // }
        
        postModels.createPost(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response))
        })
        .catch( (error) => {
                res.status(400).json(error)
        });
    })
    
    
    
}; 

exports.getAllPost = (req, res) => {

    postModels.getAllPost()
    .then((response) => {
        res.status(200).json(JSON.stringify({response}))
    })
    .catch( (error) => {
            res.status(400).json({error})
    });

}

exports.getOnePost = (req, res) => {
    const postId = req.params.id;
    let sqlInserts = [postId];
    postModels.getOnePost(sqlInserts)
    .then((response) => {
        res.status(200).json(JSON.stringify({response}))
    })
    .catch((error) =>{
        console.log(error);
        res.status(400).json({error : "lié au controller"})
    });
}

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    let sqlInserts = [postId];
    postModels.deletePost( sqlInserts)
            .then((result) => {
                    res.status(200).json(JSON.stringify({result}));
            })
            .catch((err) =>{
                    res.status(400).json({err});
            });
};

// exports.deletePost = (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
//     const userId = decodedToken.userId;
//     let postId = req.params.id;
//     let sqlInserts1 = [postId];
//     let sqlInserts2 = [postId , userId];
//     PostsModels.deletePost(sqlInserts1, sqlInserts2)
//     .then((response) => {
//         res.status(200).json(JSON.stringify({response}))
//     })
//     .catch((error) =>{
//         res.status(400).json({error})
//     });

// }


// exports.createPost = async (req, res) => {
    
//     const {user_id, user_service, comment } = req.body;
//     let image_adress = () => {
//         try {
//             if (!req.files) {
//                 res.send({
//                     status:false,
//                     message: 'Image non téléchargée'
//                 });
//             } else {
//                 let image = req.files.image;

//                 image.mv('./images/' + image.name);

//                 res.send({
//                     status:true,
//                     message: 'Image téléchargée',
//                     data: {
//                         name: image.name,
//                         mimetype: image.mimetype,
//                         size: image.size
//                     }

//                 })
//             }
//         } catch (error) {
//             res.status(500).json({error: 'Erreur lié à l\'image '})
//         }
//     }
    
//     // console.log("c'est le log du post" + req.body);
//     // const image_adress = `${req.protocol}:\\${req.get('host')}/images/${req.file.filename}`;
//     let sqlInserts = [user_id, user_service, image_adress, comment];
    
//     if (!sqlInserts.image_adress) {
//         sqlInserts = [user_id, user_service, comment];
//     }
    
//     postModels.createPost(sqlInserts)
//     .then((response) => {
//         res.status(201).json(JSON.stringify(response))
//     })
//     .catch( (error) => {
//             res.status(400).json(error)
//     });
// };



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






// exports.likesPost = (req, res) => {
// }

// exports.lovesPost = (req, res) => {
// }

// exports.congratsPost = (req, res) => {
// }