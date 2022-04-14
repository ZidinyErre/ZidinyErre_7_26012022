const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');


class UserModels{
    constructor(){

    }
    signup(slqInserts){
        let sql = 'INSERT INTO user SET ?';
        sql = mysql.format(sql,slqInserts);
        return new Promise((resolve, reject) =>{
            db.query( sql , function(err, result){
                if (err) reject({error: 'Erreur dans l\'inscription'});
                resolve({message : 'Utilisateur créé !'});
            })
        })
    }

    login(sqlInserts, password){
        let sql = 'SELECT * FROM user WHERE email = ?' ;
        sql = mysql.format(sql, sqlInserts);

        return new Promise((resolve, reject) =>{
            db.query( sql, function(err,result){
                
                if (err) reject({ err });
                if (!result[0]){
                    reject({error : 'Utilisateur introuvable !'});
                } else {
                    bcrypt.compare(password, result[0].password, (bErr, bResult) => {
                        if(bErr){
                            reject({error: 'Echec de l\'opération lié au mots de passe'});
                            console.log(bErr);
                        }
                        if(bResult){
                            const token = jwt.sign(
                                {userId: result[0].id},
                                process.env.ACCESS_TOKEN_SECRET,
                                {expiresIn: '24h'}
                            )
                            resolve({message: 'Bonjour et bienvenue!' + "" + token});
                            console.log(token);
                            console.log(bResult);
            
                        }
                    })
                }
            })
        })

    }


    deleteUser(sqlInserts){
        let sql = 'DELETE FROM user WHERE id = ?';
        sql = mysql.format(sql,sqlInserts);
        return new Promise((resolve, reject) =>{
            db.query(sql, function(err, result){
                if (err) reject({error: 'Echec de l\'opération!'});
                resolve({message : 'Utilisateur supprimé !'});            
            })
        })
    }


}



module.exports = UserModels;
// let User = function(user){

//     this.nom = nom;
//     this.prenom = prenom;
//     this.email = email;
//     this.password = password;
//     this.creation_time = new Date();;
//     this.modification_time = new Date();;
//     this.service = service;
//     this.role = role;

// }


//     User.create =  async function  (newUser, result) {
//         let hashedPassword = await bcrypt.hash(password,10);
//         db.query( 'INSERT INTO user SET ?', newUser , {password : hashedPassword} , function(err, res) {
//             if (err) {
//                 console.log("error: ", err);
//                 result(err);
//             } else {
//                 console.log(res);
//                 result(res);
//             }
//         })

//     }


// module.exports = User;

// exports.signup =  (req, res) => {

//     function create(input) {
//         db.query( 'INSERT INTO user SET ?', input, (err, result) =>{
//             if(err) {
//                 console.log(err);
//             }
//             else{
//                 console.log(result);
    
//             } 
//         });
//     }
   
        
// };

// exports.signup = async (req, res) => {
//     const {nom, prenom, email, password, service, role} = req.body;
//     let hashedPassword = await bcrypt.hash(password,10);
//     console.log(hashedPassword);
//         db.query( 'INSERT INTO user SET ?', {nom : nom, prenom : prenom, email : email, password : hashedPassword, service : service, role : role}, function(err,data){
//             if (err) throw(err);
//             return console.log(data);
//         })
        
// };



// exports.login = (req, res) => {
//     const {email,password} = req.body;
//     console.log(email,password);
//     db.query('SELECT * FROM user WHERE email = ?', [email])
//         .then(res => console.log(res))
//         .catch(err => console.log(err));

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
//     const {nom, prenom, password, service, role} = req.body;
//     const id = req.params.id;
//     let hashedPassword = await bcrypt.hash(password,10);
//     db.query('UPDATE user SET nom = ?, prenom = ?, password = ?, service = ?, role = ? WHERE id = ?', [nom, prenom, hashedPassword, service, role, id] ) 
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// };



// exports.getOneUser =  (req, res) => {
//     const id = req.params.id;
//     db.query('SELECT * FROM user WHERE id = ?', [id]) 
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// };