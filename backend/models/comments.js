const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
  content: String,
  idcommenter: { type: Schema.Types.ObjectId, ref:'users' },
  slugArticle: String,  
}, {timestamps: true});

module.exports = mongoose.model('comments', comment);