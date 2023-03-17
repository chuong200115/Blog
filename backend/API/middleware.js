const jwt = require('jsonwebtoken');

const middleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if(token){
            const accessToken = token.split(" ")[1];            
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user)=>{
                if(err){
                    res.status(403).json('Token is not valid');
                }
                req.user = user
                next();
            })
        }
        else {
            res.status(401).json('You are not authenticated');
        }
    }
}

module.exports = middleware;