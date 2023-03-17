const router = require('express').Router();
const authController = require('../API/authController');
const updateSetting = require('../API/updateSetting')
const middleware = require('../API/middleware')

router.post('/', authController.registerUser);
router.post('/login', authController.login);
router.put('/', middleware.verifyToken, updateSetting.update)



module.exports = router;