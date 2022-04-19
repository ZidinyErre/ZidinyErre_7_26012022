const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-controller');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer, postCtrl.createPost);

module.exports = router;