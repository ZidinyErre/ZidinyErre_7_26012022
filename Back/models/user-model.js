const db = require('../config/db');

exports.signup = async (req, res) => {
    const {nom, prenom, email, password, service, role} = req.body;
    let hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
        db.promise().query( 'INSERT INTO user SET ?', {nom : nom, prenom : prenom, email : email, password : hashedPassword, service : service, role : role})
        .then(res => console.log(res))
        .catch(err => console.log(err));
};



exports.login = (req, res) => {
    const {email,password} = req.body;
    console.log(email,password);
    db.query('SELECT * FROM user WHERE email = ?', [email],  (err, result) =>{
        if(err){
            res.status(500).json({error: 'Echec de l\'opération'});
            console.log(err);
        }
        if(!result[0]){
            res.status(400).json({error: 'Email introuvable!'});

        }
        bcrypt.compare(password, result[0]['password'], (bErr, bResult) => {
            if(bErr){
                res.status(500).json({error: 'Echec de l\'opération lié au mots de passe'});
                console.log(bErr);
            }
            if(bResult){
                const token = jwt.sign(
                    {userId: result[0].id},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '24h'}
                )
                res.status(200).json({message: 'Bonjour et bienvenue!' + "" + token});
                console.log(token);
                console.log(bResult);

            }
        })
    })
};

exports.logout = (req, res) => {
const {token , decodedToken} = require('../middlewares/auth')
    if (token === decodedToken) {
        delete(token);
        // res.redirect('/');
        res.status(200).json({message: 'Déconnecté'});
    }else{
        res.status(400).json({error: ' Problème lié à la connexion'});
        console.log(err);
    }
};



exports.updateUser = async (req, res) => {
    const {nom, prenom, password, service, role} = req.body;
    const id = req.params.id;
    let hashedPassword = await bcrypt.hash(password,10);
    db.promise().query('UPDATE user SET nom = ?, prenom = ?, password = ?, service = ?, role = ? WHERE id = ?', [nom, prenom, hashedPassword, service, role, id] ) 
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

exports.deleteUser = (req, res) => {
    db.promise().query('DELETE FROM user WHERE id = ?', [req.params.id])
    .then(res => console.log(res))
    .catch(err => console.log(err));
};


exports.getOneUser =  (req, res) => {
    db.promise().query('SELECT * FROM user WHERE id = ?', [req.params.id]) 
    .then(res => console.log(res))
    .catch(err => console.log(err));
};