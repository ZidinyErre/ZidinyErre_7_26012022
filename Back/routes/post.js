const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multerConfig');

router.post('/', auth, multer, postCtrl.create);

module.exports = router;