const db = require("../config/db");
const bcrypt = require('bcrypt');
const UserModels = require("../models/user-model");
require('dotenv').config();

let userModels = new UserModels();

exports.signup = async (req, res) => {
        const {nom, prenom, email, password, service, role} = req.body;
        let hashedPassword = await bcrypt.hash(password,10);
        let sqlInserts = {nom : nom, prenom : prenom, email : email, password : hashedPassword, service : service, role : role};
        userModels.signup(sqlInserts)
                .then((result) => {
                        res.status(201).json(JSON.stringify({result}));
                        // res.status(201).json({result});
                })
                .catch((err) =>{
                        res.status(400).json({err});
                });
};
    
exports.login = (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let sqlInserts = [email];

        userModels.login(sqlInserts, password)
                .then((result) => {
                        res.status(200).json(JSON.stringify({result}));
                })
                .catch((err) =>{
                        res.status(400).json({err});
                });


}

exports.updateUser = async (req, res) => {
        const {nom, prenom, password, service, role} = req.body;
        const userId = req.params.id;
        let hashedPassword = await bcrypt.hash(password,10);
        let sqlInserts = [nom, prenom, hashedPassword, service, role, userId] ;
        
        userModels.updateUser(sqlInserts)
        .then((response) => {
                res.status(200).json(JSON.stringify(response))
        })
        .catch( (error) => {
                res.status(400).json(error)
        });

};

exports.deleteUser = (req, res) => {
        const userId = req.params.id;
        let sqlInserts = [userId];
        userModels.deleteUser( sqlInserts)
                .then((result) => {
                        res.status(200).json(JSON.stringify({result}));
                })
                .catch((err) =>{
                        res.status(400).json({err});
                });
};

// exports.signup = async (req, res) => {
//         const {nom, prenom, email, password, service, role} = req.body;
//         let hashedPassword = await bcrypt.hash(password,10);
//         console.log(hashedPassword);
//             db.query( 'INSERT INTO user SET ?', {nom : nom, prenom : prenom, email : email, password : hashedPassword, service : service, role : role}, (err, result) =>{
//                 if(err) {
//                     res.status(400).json({error: 'Utilisateur non sauvegardé ! L email est probablement déjà utilisé!'});
//                     console.log(err);
//                 }
//                 else{
//                     res.status(201).json({ message: 'Utilisateur créé !' });
//                     console.log(result);
        
//                 } 
//             });
//     };
    

// exports.signup =  (req, res) => {
//     User.signup(req.body)
//         .then(response =>  res.status(201).json({ response, message: 'Utilisateur créé !' }))
//         .catch(error => res.status(400).json({error: 'Utilisateur non sauvegardé ! L email est probablement déjà utilisé!'}));
// };



// exports.login = (req, res) => {
//     let user = result[0];
//     User.login(req.body, user)
//         .then( user => {
//             if(!user){
//                 res.status(400).json({error: 'Email introuvable!'});
//             }
//             bcrypt.compare(req.body.password, user['password'], (bErr, bResult) => {
//                 if(bErr){
//                     res.status(500).json({error: 'Echec de l\'opération lié au mots de passe'});
//                 }
//                 if(bResult){
//                     const token = jwt.sign(
//                         {userId: user.id},
//                         process.env.ACCESS_TOKEN_SECRET,
//                         {expiresIn: '24h'}
//                     )
//                     res.status(200).json({message: 'Bonjour et bienvenue!' + "" + token});
//                 }
//             })
//         })
//         .catch( error => res.status(500).json({error: 'Echec de l\'opération'}));

    
    
//     // const {email,password} = req.body;
//     // console.log(email,password);
//     // db.query('SELECT * FROM user WHERE email = ?', [email],  (err, result) =>{
//     //     if(err){
//     //         res.status(500).json({error: 'Echec de l\'opération'});
//     //         console.log(err);
//     //     }
//     //     if(!result[0]){
//     //         res.status(400).json({error: 'Email introuvable!'});

//     //     }
//     //     bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
//     //         if(bErr){
//     //             res.status(500).json({error: 'Echec de l\'opération lié au mots de passe'});
//     //             console.log(bErr);
//     //         }
//     //         if(bResult){
//     //             const token = jwt.sign(
//     //                 {userId: result[0].id},
//     //                 process.env.ACCESS_TOKEN_SECRET,
//     //                 {expiresIn: '24h'}
//     //             )
//     //             res.status(200).json({message: 'Bonjour et bienvenue!' + "" + token});
//     //             console.log(token);
//     //             console.log(bResult);

//     //         }
//     //     })
//     // })
// };

// exports.logout = (req, res) => {
// const {token , decodedToken} = require('../middlewares/auth')
//     if (token === decodedToken) {
//         delete(token);
//         // res.redirect('/');
//         res.status(200).json({message: 'Déconnecté'});
//     }else{
//         res.status(400).json({error: ' Problème lié à la connexion'});
//         console.log(err);
//     }
// };


// exports.updateUser = async (req, res) => {

//     User.updateUser(req.body, req.params)
//         .then(response => res.status(200).json({response, message : 'Utilisateur modifié !'}))
//         .catch( error => res.status(400).json({error : 'Utilisateur non modifié !'}));

//     // const {nom, prenom, password, service, role} = req.body;
//     // const id = req.params.id;
//     // let hashedPassword = await bcrypt.hash(password,10);
//     // db.query('UPDATE user SET nom = ?, prenom = ?, password = ?, service = ?, role = ? WHERE id = ?', [nom, prenom, hashedPassword, service, role, id] , (err, result, fields) => {
//     //     if (err) {
//     //         res.status(400).json({error : 'Utilisateur non modifié !'});
//     //         console.log(err);
//     //     }else{
//     //         res.status(200).json({message : 'Utilisateur modifié !'})
//     //         console.log(result);
//     //     }
//     // })

// };

// exports.deleteUser = (req, res) => {

//     User.deleteUser( req.params)
//         .then(response => res.status(200).json({response, message : 'Utilisateur supprimé !'}))
//         .catch( error => res.status(400).json({error : 'Echec de l\'opération !'}));

//     // db.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows, fields) => {
//     //     if(!err){
//     //         res.status(200).json({message : 'Utilisateur supprimé !'})
//     //     }else{
//     //         res.status(400).json({error : 'Echec de l\'opération !'});
//     //         console.log(err);

//     //     }
//     // })
// };


// exports.getOneUser =  (req, res) => {

//     User.getOneUser( req.params)
//     .then(response => res.status(200).json({response}))
//     .catch( error => res.status(400).json({error : 'Utilisateur introuvable!'}));

//     // db.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, result) => {
//     //     if(!err){
//     //         if (result.length === []) {
//     //             res.status(400).json({error : 'Utilisateur introuvable!'});
//     //             console.log(err);
//     //         } else {
//     //             return res.status(200).json({result})           
//     //         }            
//     //         // return;
//     //     }else{
//     //         res.status(400).json({error : 'Utilisateur introuvable!'});
//     //         console.log(err);
//     //     }
//     // })
// };
