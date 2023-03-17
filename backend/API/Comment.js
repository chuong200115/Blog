const Comment = require('../models/comments');
const User = require('../models/users');

const comment = (()=> {
    const createComment= async (req, res) =>{
      try {
          const newComment = new Comment ({
            content: req.body.comment,
            idcommenter: req.user.id,
            slugArticle: req.body.slug,
          })
        const comment = await newComment.save();
        const user = await User.findById(req.user.id);
        comment.idcommenter = user;
        res.json({ comment });
      }catch(err){
          res.status(422).json(err);
      }
      
    }
    const getComment = async (req, res) => {
        try {
          const comments = await Comment.find({ slugArticle: req.query.slug }).sort({ createdAt: 'desc' }).populate('idcommenter');
            res.json({ comments });
        } catch (error) {
          res.status(422).json(error);
        }
    }
    return {
        createComment,
        getComment
    }
})();

module.exports = comment;
