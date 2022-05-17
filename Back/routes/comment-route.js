const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment-controller');

router.post('/', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getOneComment);

module.exports = router;