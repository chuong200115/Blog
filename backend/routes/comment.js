const router = require('express').Router();
const comment = require('../API/Comment');
const middleware = require('../API/middleware');

router.post('/', middleware.verifyToken, comment.createComment);
router.get('/', comment.getComment);


module.exports = router;