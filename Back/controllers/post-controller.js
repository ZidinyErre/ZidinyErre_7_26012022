const db = require("../config/db");
const jwt = require('jsonwebtoken');
const path = require("path");
const PostsModels = require('../models/post-model');
const multer = require('multer');
require('dotenv').config();
// const multer = require('../middlewares/multer-config');
// const multerUpload = multer.single('image_adress');

let postModels = new PostsModels();

// Crée une Publication
// Pourquoi tu as mis async?
// CReate post marche pas totalement pour l'instant
// async
//TODO est ce que image getall getone s'affiche bien
exports.createPost =  (req, res) => {

    const {user_id, user_service, annotation } = req.body;
    const image_adress = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    console.log(image_adress + "contr image");
    console.log(req.file + 'req.file');
    // console.log(req.body + 'req.body');

    let sqlInserts = [ user_id, user_service, image_adress , annotation];

    
    postModels.createPost(sqlInserts)

    .then((response) => {
        res.status(201).json(JSON.stringify(response))
    })
    .catch( (error) => {
            res.status(400).json(error)
    });

    
        // const {user_id, user_service, annotation } = req.body;
        // let sqlInserts = [user_id, user_service, annotation];
        // console.log(sqlInserts + 'controller2');

        // postModels.createPost(sqlInserts)
        // .then((response) => {
        //     res.status(201).json(JSON.stringify(response))
        // })
        // .catch( (error) => {
        //         res.status(400).json(error)
        // });

    
}; 

// Montre toute les Publications
exports.getAllPost = (req, res) => {

    postModels.getAllPost()
    .then((response) => {
        res.status(200).json(JSON.stringify({response}))
    })
    .catch( (error) => {
            res.status(400).json({error})
    });

}

// Montre une  Publication

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

// Modifie une  Publication
exports.updatePost = (req, res) => {
    console.log(req.file);
    let postId = req.params.id;
        // Peut être que cette partie la sert à rien, choisi entre les deux user id
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
        let userId = decodedToken.userId;
        // 

        const { annotation } = req.body;
        const image_adress = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        console.log(image_adress + "contr update image");


        let sqlInserts1 = [userId];
        let sqlInserts =  [ annotation, image_adress, postId, userId];
        let sqlInserts2 =  [ annotation, postId, userId];


        postModels.updatePost( sqlInserts , sqlInserts1, sqlInserts2)
            .then((response) => {
                res.status(200).json(JSON.stringify({response}))
            })
            .catch( (error) => {
                if (error instanceof multer.MulterError) {
                res.status(400).json({error})
                }
            });

    // if (req.file == undefined) {


    //     let sqlInserts =  [  annotation, postId, userId];

    //     postModels.updatePost( sqlInserts , sqlInserts1)
    //         .then((response) => {
    //             res.status(200).json(JSON.stringify({response}))
    //         })
    //         .catch( (error) => {
    //             res.status(400).json({error})
    //         });
    // } else {
        
    //     let sqlInserts =  [ image_adress , annotation, postId, userId  ];
    //     console.log(sqlInserts + "file1");
    
    //     postModels.updatePost( sqlInserts , sqlInserts1)
    //         .then((response) => {
    //             res.status(200).json(JSON.stringify({response}))
    //         })
    //         .catch( (error) => {
    //             res.status(400).json({error})
    //         });
    //         console.log(sqlInserts + "file2");
    // }
}

// Supprime une  Publication
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

exports.likesPost = (req, res) => {
    let user_like = req.body.user_id;
    let postId = req.params.id;
    let liked = req.body.liked;
    let sqlInserts = [user_like,postId];
    // console.log(liked);
    // console.log(user_id);
    // console.log(postId);


    postModels.likesPost(sqlInserts,liked)
    .then((response) => {
        res.status(201).json(JSON.stringify({response}))
    })
    .catch((error) => {
        res.status(400).json({error})
    });
}


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

