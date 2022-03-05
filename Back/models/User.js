const db = require('./db');

class User {
    constructor(nom, prenom, email, password, service, role){
        this.nom = nom;
        this.prenom = prenom; 
        this.email = email;
        this.password = password;
        this.service = service;
        this.role = role;
 
    }
}

module.exports = User