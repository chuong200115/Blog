var router = require('express').Router();
var mongoose = require('mongoose');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

const profileController = (()=> {
    // //Preload
    // const preloadUser = async (req, res, next, username) =>{
    //     User.findOne({username: username}).then((user) => {
    //         if (!user) { return res.sendStatus(404); }        
    //         req.profile = user;        
    //         return next();
    //       }).catch(next);
    // }
    
    const getProfile = (req, res) =>{
      try{
        const id = req.user?.id;
        const username = req.params.username;

        Promise.all([
          User.findOne({username}),
          id ? User.findById(id) : null,
        ])
          .then((results) => {
            if(!results[0]) return res.sendStatus(422);
            return res.json({
              profile: {
                email: results[0].email,
                username: results[0].username,
                bio: results[0].bio,
                image: results[0].image,
                following: true
              }
            })
          })
      }catch(err){
            res.status(422).json(err)
      }
    }

    const follow = (req, res, next) =>{
      try{
        const id = req.user.id;
        const username = req.params.username;

        Promise.all([
          User.findOne({username}),
          id ? User.findById(id) : null,
        ])
          .then((results) => {
            if(!results[0]) return res.sendStatus(422);
            if(!results[1]) return res.sendStatus(401);
            results[1].follow(results[0]._id).then(() =>
              res.json({
                profile:  results[0].toProfileJSONFor(results[1]),
              }),
            );
          })
          .catch(next);
      } catch (err) {
        res.status(422).json({errors: {profile: [err] } });
      }
    }

    const unfollow = (req, res, next) => {
      try{
        const id = req.user.id;
        const username = req.params.username;

        Promise.all([
          User.findOne({username}),
          id ? User.findById(id) : null,
        ])
          .then((results) => {
            if(!results[0]) return res.sendStatus(422);
            if(!results[1]) return res.sendStatus(401);
            results[1].unfollow(results[0]._id).then(() =>
              res.json({
                profile: results[0].toProfileJSONFor(results[1]),
              }),
            );
          })
          .catch(next);
      } catch (err) {
        res.status(422).json({errors: {profile: [err] } });
      }
    }

    return {
        getProfile, 
        follow,
        unfollow,
    }
})();

module.exports = profileController;