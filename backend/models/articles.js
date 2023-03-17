const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');


const article = new Schema({  
  title: String,  
  description: String,
  body: String,  
  tagList: Array,    
  favorited: Array,  
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  slug: {
    type: String,    
  },
}, {timestamps: true});

article.pre("save", async function (next) {
  // const unique = uniqueSlug(new Date().getTime().toString());
  this.slug = slugify(this.title, { lower: true }) + '.' + uuidv4() ;
  next();
});

module.exports = mongoose.model('article', article);