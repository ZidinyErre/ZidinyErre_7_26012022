// const db = require('./db');
// const { Sequelize } = require("sequelize");
// DataTypes = require('sequelize');

// const User = Sequelize.define('user',{
//     id : {
//         type : DataTypes.INTEGER.UNSIGNED,
//         primeryKey : true,
//         autoIncrement : true,
//         allowNull : false
//     },
//     nom : {
//         type : DataTypes.STRING,
//         allowNull : true
//     },
//     prenom : {
//         type : DataTypes.STRING,
//         allowNull : true
//     },
//     email : {
//         type : DataTypes.STRING,
//         unique : true,
//         allowNull : false
//     },
//     password : {
//         type : DataTypes.STRING,
//         allowNull : true
//     },
//     creation_time : {
//         type : DataTypes.DATE,
//         createdAt : true,
//         allowNull : true
//     },
//     modification_time : {
//         type : DataTypes.STRING,
//         allowNull : true
//     },
//     service : {
//         type : DataTypes.STRING,
//         allowNull : true
//     },
//     role : {
//         type : DataTypes.STRING,
//         allowNull : true
//     }
// });

// module.exports = User

// class User {
//     constructor(nom, prenom, email, password, service, role){
//         this.nom = nom;
//         this.prenom = prenom; 
//         this.email = email;
//         this.password = password;
//         this.service = service;
//         this.role = role;
 
//     }
// }

// module.exports = User