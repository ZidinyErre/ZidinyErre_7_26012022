const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment-controller');

router.post('/', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.put('/:id', auth, commentCtrl.likescomment);
router.delete('/:id', auth, commentCtrl.deleteComment);
module.exports = router;