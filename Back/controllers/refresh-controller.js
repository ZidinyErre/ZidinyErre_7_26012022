const RefreshModels = require("../models/refresh-model");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const refreshModels =  new RefreshModels();


exports.refresh = (req, res) => {
    let email = req.body.email;
    let refreshToken = req.body.refreshToken;
    let password = req.body.password;
    let verifyRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    let sqlInserts = [email, refreshToken];
     
    // La partie else ne fonctionne pas  les erreur sont fournie par jwt
    if ( verifyRefresh) {

        refreshModels.refresh(sqlInserts, password)
        .then((result) => {
                res.status(200).json(JSON.stringify({result}));
        })
        .catch((err) =>{
                res.status(400).json({err});
        });  

    } else {
       
        res.status(400).send({error: 'Le refresh token est invalide!'});

    }

    
}