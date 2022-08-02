const db = require("../config/db");
const jwt = require('jsonwebtoken');
const path = require("path");
const PostsModels = require('../models/post-model');
require('dotenv').config();

let postModels = new PostsModels();

// Crée une Publication
// Pourquoi tu as mis async?
// CReate post marche pas totalement pour l'instant
// async
exports.createPost =  (req, res) => {
    console.log(req.body.annotation + "controllerannot"); 
    if(!req.body.annotation){
        res.send({
            status:false,
            message: 'Veuillez remplir la partie commentaire de cette publication.'
        })

    }else if (req.files) {


        const {user_id, user_service, annotation } = req.body;
        let image;
        let imagesUpload;
        
        // if (!req.files) {
        //     res.send({
        //     status:false,
        //     message: 'Image non téléchargée'
        //     });
        // }

        image = req.files.image_adress;
        imagesUpload = path.join(__dirname , "//..//images//",image.name );
        console.log(image);
        console.log(imagesUpload);
        console.log(__dirname);
        console.log(typeof(image));
        // .mv permet de mettre le req.files ou on veut
        image.mv(imagesUpload, function (err){
            if (err) return res.status(500).send(err);

            let sqlInserts1 = [ user_id, user_service,  image.name, annotation];
            console.log(sqlInserts1 + 'controller1');
            // if (!sqlInserts.image_adress) {
            //     sqlInserts = [user_id, user_service, annotation];
            // }
            
            postModels.createPost(sqlInserts1)

            .then((response) => {
                res.status(201).json(JSON.stringify(response))
            })
            .catch( (error) => {
                    res.status(400).json(error)
            });

        })
    }else{
      
        const {user_id, user_service, annotation } = req.body;
        console.log(req.body.annotation + "controllannot2");
        let sqlInserts2 = [user_id, user_service, annotation];
        console.log(sqlInserts2 + 'controller2');

        postModels.createPost(sqlInserts2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response))
        })
        .catch( (error) => {
                res.status(400).json(error)
        });
    }
    
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
    let userId = decodedToken.userId;
    let user_id = userId;
    let postId = req.params.id;
    let dataImage = req.files;
    let request = req.body;


    let { annotation, image_adress} = req.body; 
    console.log(dataImage);
    console.log(request);


    // let image_adress;
    let imagesUpload;
    if (!req.files) {
        res.send({
        status:false,
        message: 'Image non téléchargée'
        });
    }
    image_adress = req.files.image_adress;
    imagesUpload = path.join(__dirname , "//..//images//",image_adress.name );
    if(image_adress){
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: image_adress.name,
                mimetype: image_adress.mimetype,
                size: image_adress.size
            }
        })
    }
    
    console.log(image_adress);
    // console.log(image.name);


    let sqlInserts1 = [postId];
    let sqlInserts2 = [annotation , image_adress.name , postId, user_id   ];
    console.log(sqlInserts2);

    
    image_adress.mv(imagesUpload, function (err){
        if (err) return res.status(500).send(err);
        
        postModels.updatePost(sqlInserts1,sqlInserts2)
        .then((response) => {
            res.status(200).json(JSON.stringify({response}))
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json({error})
        });
    })

    
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

// exports.updatePost = (req, res) => {
// }








// exports.lovesPost = (req, res) => {
// }

// exports.congratsPost = (req, res) => {
// }