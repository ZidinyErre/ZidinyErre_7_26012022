const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post-controller');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/', auth , postCtrl.getAllPost);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth , postCtrl.getOnePost);
router.put('/:id',  auth , multer,postCtrl.updatePost);
router.put('/:id', auth, postCtrl.likesPost);
router.delete('/:id', auth , postCtrl.deletePost);
// multer.single('image')
module.exports = router;