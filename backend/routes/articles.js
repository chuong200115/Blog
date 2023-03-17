const router = require('express').Router();
const articleController = require('../API/articles');
const middleware = require('../API/middleware')

router.post('/', middleware.verifyToken, articleController.article);
router.get('/', articleController.getArticle);
router.post('/favorite', middleware.verifyToken, articleController.favorite);
router.param('slug', articleController.getArticleForReadmore)
    .route('/:slug')
    .get(articleController.getArticleForReadmore);


// router.put('/', middleware.verifyToken, updateSetting.update)


module.exports = router;