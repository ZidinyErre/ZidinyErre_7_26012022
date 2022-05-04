const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-controller');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/upload-image', auth, postCtrl.createPost);
// multer.single('image')
module.exports = router;