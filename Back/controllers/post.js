const db = require("../models/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.createPost = (req, res) => {
    const {}= req.body;
    const userId = 'SELECT * FROM user JOIN  post ON user.user_id = user.id';
    db.query()
}

exports.updatePost = (req, res) => {
}

exports.deletePost = (req, res) => {
}

exports.getAllPost = (req, res) => {
}

exports.getOnePost = (req, res) => {
}

exports.likesPost = (req, res) => {
}

exports.lovesPost = (req, res) => {
}

exports.congratsPost = (req, res) => {
}