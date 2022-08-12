const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user-controller');

router.post('/upload-image/signup', userCtrl.signup);
router.post('/login', userCtrl.login); 
// router.get('/logout', userCtrl.logout); 
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.get('/:id', userCtrl.getOneUser);



module.exports = router; 