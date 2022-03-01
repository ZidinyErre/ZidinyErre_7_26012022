const express = require('express');
const router = express.Router();
const userCtrl = require('../models/user.model');

router.post('/signup', userCtrl.signup);

module.exports = router;