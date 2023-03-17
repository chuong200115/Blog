const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = (()=> {
    const update= async(req,res) =>{        
      try{
        const { email, image, username, bio, password } = req.body.user;
        if(email?.trim() === '' && image?.trim() === '' && username?.trim() === '' && bio?.trim() === '' && password?.trim() === ''){
          return res.status(404).json('Update failed');
        }
        
          const userssss = {}
        if(email?.trim() !== '') userssss.email = email;
        if(image?.trim() !== '') userssss.image = image;
        if(username?.trim() !== '') userssss.username = username;   
        if (bio?.trim() !== '') userssss.bio = bio;
        if (password?.trim() !== '') {
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(password, salt);
          userssss.password = hashed;
        } 
        const user = await User.findByIdAndUpdate(req.user.id, userssss, {new: true, runValidators: true});
          if(!user){
              return res.status(404).json('Update failed');
          }
          return res.status(200).json({user});
      }catch(err){
          res.status(422).json(err);
      }
    }
    return {
        update,
    }
})();

module.exports = authController;
