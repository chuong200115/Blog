const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  email:{
    type: String,
    unique: true,
  },
  token: String,
  username:{
    type: String,
    unique: true,
  },
  bio: String,  
  password:{
    type: String,
    required: true,
    minlength: 6,
  },  
  image: {
    type: String,
  },
  URL: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  
});

user.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this._id) : false
  };
}

user.methods.follow = function(id){
  if(this.following.indexOf(id) === -1){
    this.following.push(id);
  }

  return this.save();
};

user.methods.unfollow = function(id){
  this.following.remove(id);
  return this.save();
};

user.methods.isFollowing = function(id){
  return this.following.some(function(followId){
    return followId.toString() === id.toString();
  });
};

module.exports = mongoose.model('users', user);
