const router = require('express').Router();
const profiles = require('../API/profiles');
const middleware = require('../API/middleware');


router.get('/:username', profiles.getProfile);
router.post('/:username/follow', middleware.verifyToken, profiles.follow);
router.delete('/:username/unfollow', middleware.verifyToken, profiles.unfollow);



module.exports = router;