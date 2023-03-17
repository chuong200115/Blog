const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = (()=> {
    //REGISTER
  const registerUser= async(req,res) =>{
    try {
      const {email,username,password} = req.body.user;
      if(!email) throw ('Invalid email');
      if(!username) throw ('Invalid username');
      if(!password) throw ('Invalid password');      
      
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      //Create new user
      const newUser = await new User({
        username: username,
        token: '',
        email: email,
        password: hashed,
      });      
      
      const jwtToken = jwt.sign({
          id: newUser._id,              
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "10"}                         
      );   
      
            newUser.token = jwtToken;                 
            console.log(newUser);
            const user = await newUser.save();
            console.log(user);
            res.json({
                user: {
                  username: user.username,
                  email: user.email,                  
                  token: jwtToken,
                }
              })              
    }catch(err){
      res.status(422).json({
        errors: {
          body: [
            err
          ]
        }
      });
    }
  }

    //LOGIN
    const login= async(req,res) =>{
      try {
        const {email, password} = req.body.user;
          const user = await User.findOne({email});
          if(!user){
              return res.status(404).json('Wrong username!');
          }
          const validPassword = await bcrypt.compare(
              password,
              user.password
          );
          if(!validPassword){
              return res.status(404).json('Wrong password!');           
          }
          if(user && validPassword){
            const jwtToken = 
            jwt.sign({
              id: user.id,              
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "1d"}                         
            );
            

              return res.status(200).json({
                  user: {
                    email: user.email,
                    token: jwtToken,
                    username: user.username,
                    bio: user.bio,
                    image: user.image,
                  },                  
                });
          }

      }catch(err){
          res.status(422).json(err);
      }
    }

    const update= async(req,res) =>{
      try{            
          const {email, password, token, username, bio, image} = req.body.user;
          const user = await users.findOne({email});
          if(!user){
              return res.status(404).json('Wrong username!');
          }
          const validPassword = await bcrypt.compare(
              password,
              user.password
          );
          if(!validPassword){
              return res.status(404).json('Wrong password!');                
          }
          if(user && validPassword){
            const jwtToken = 
            jwt.sign({
              id: user.id,              
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "1d"}                         
            );            

              return res.status(200).json({
                  user: {
                    email: user.email,
                    token: jwtToken,
                    username: user.username,
                    bio: user.bio,
                    image: user.image,
                  }
                });
          }

      }catch(err){
          res.status(422).json(err);
      }
    }

    return {
        registerUser, 
        login,
        update,
    }
})();

module.exports = authController;