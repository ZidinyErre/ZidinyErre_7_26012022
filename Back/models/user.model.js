const db = require("./db");

// constructor
const User = function(user){
    this.id = user.id;
    this.nom = user.nom;
    this.prenom = user.prenom;
    this.email = user.email;
    this.password = user.password;
    this.service = user.service;
    this.role = user.role;
};

User.create = (newUser, result) => {
    db.query("INSERT INTO user SET ?", newUser, (err,res) =>{
        if (err){
            console.log("error: ", err);
            result(err,null);
            return;
        }

    });
};

