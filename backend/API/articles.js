const mongoose = require('mongoose');
const Article = require('../models/articles');
const jwt = require('jsonwebtoken');

const articleController = (() => {
    
  const article = async (req, res) => {
    try {
      const { title, description, body, tagList } = req.body.article;
                 
      const newArticle = new Article({
        title: title,
        description: description,
        body: body,
        tagList: tagList,
        author: req.user.id
      });

      const article = await newArticle.save();
            

      if (!article) {
        return res.status(404).json('Update failed');
      }
      return res.status(200).json({
        article
      });
    } catch (err) {
      res.status(422).json(err);
    }
  };

  const getArticle = async (req, res) => {
    try {
      const articleCount = await Article.countDocuments();
      Article.find(null, null, { limit: 10, skip: (req.query.offset - 1) * 10 }).sort({ createdAt: 'desc' }).populate({ path: "author", select: "username image" }).then(
        (returnArticle) => {
          res.json({ articleCount, returnArticle });
        }
      )
    } catch (err) {
      res.status(422).json(err);
    }
  };
    
  const favorite = async (req, res) => {
    try {
      const idArticle = req.body.id;
      const article = await Article.findById(idArticle);
      const idliker = req.user.id;
      if (!article.favorited.includes(idliker)) {
        article.favorited.push(idliker);
        const updateFavorited = await article.save();
        res.json(updateFavorited);
      } else {
        article.favorited = article.favorited.filter(id => id !== idliker);
        const updateFavorited = await article.save();
        res.json(updateFavorited);
      }

    } catch (error) {
      res.status(422).json(error);
    }
  }
  
  const getArticleForReadmore = async (req, res, next) => {
    try {
      const currentArticle = await Article
        .findOne({ slug: req.params.slug })
        .populate('author')
      if (!currentArticle) {
        return next(new Error('The current article does not exist'));
      }
  
      res.status(201).json({
        status: 'success',
        article : currentArticle
      });
    } catch (err) {
      res.status(404).json({
        status: 'Not found'
      });
    }
  }
    
    return {
      article,
      getArticle,
      favorite,
      getArticleForReadmore
    }
  })();

module.exports = articleController;