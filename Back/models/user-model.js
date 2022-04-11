const db = require('../config/db');


let User = function(user){

    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.password = password;
    this.creation_time = new Date();;
    this.modification_time = new Date();;
    this.service = service;
    this.role = role;

}


    User.create =  async function  (newUser, result) {
        let hashedPassword = await bcrypt.hash(password,10);
        db.query( 'INSERT INTO user SET ?', newUser , {password : hashedPassword} , function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err);
            } else {
                console.log(res);
                result(res);
            }
        })

    }


module.exports = User;
// exports.signup = async (req, res) => {
//     const {nom, prenom, email, password, service, role} = req.body;
//     let hashedPassword = await bcrypt.hash(password,10);
//     console.log(hashedPassword);
//         db.query( 'INSERT INTO user SET ?', {nom : nom, prenom : prenom, email : email, password : hashedPassword, service : service, role : role})
//         .then(res => console.log(res))
//         .catch(err => console.log(err));
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

// exports.deleteUser = (req, res) => {
//     const id = req.params.id;
//     db.query('DELETE FROM user WHERE id = ?', [id])
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// };


// exports.getOneUser =  (req, res) => {
//     const id = req.params.id;
//     db.query('SELECT * FROM user WHERE id = ?', [id]) 
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// };