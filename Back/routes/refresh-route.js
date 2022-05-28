const express = require('express');
const router = express.Router();
const  refreshCtrl = require('../controllers/refresh-controller');

router.post('/refresh', refreshCtrl.refresh);

module.exports = router; 
