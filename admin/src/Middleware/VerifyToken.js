import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//handle verify token whenever request send to server
//if token is valid, request will be processed
//(get token from header Authorization and compare with secret key)
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: "unauthorized"});
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "forbidden"});
        req.user = user;
        next();
    });
}

export default verifyToken;
