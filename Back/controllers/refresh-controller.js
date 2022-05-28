const RefreshModels = require("../models/refresh-model");

const refreshModels =  new RefreshModels();


exports.refresh = (req, res) => {
    let email = req.body.email;
    let refreshToken = req.body.refreshToken;
    let password = req.body.password;
    let sqlInserts = [email, refreshToken];

    refreshModels.refresh(sqlInserts, password)
            .then((result) => {
                    res.status(200).json(JSON.stringify({result}));
            })
            .catch((err) =>{
                    res.status(400).json({err});
            });
}