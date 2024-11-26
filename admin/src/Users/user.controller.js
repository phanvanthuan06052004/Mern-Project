import User from './user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const checkPermission = async (req, res) => {
    try {
        const {Username, password} = req.body;
        const user = await User.findOne({Username});
        if(!user) return res.status(404).json({message: "not found user"});
        if(user.password !== password) return res.status(401).json({message: "invalid password"});

        //handel jwt (playload, secret key, expiresIn)
        //send token when login success
        const token = jwt.sign({id: user._id, name: user.Username, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.status(200).json({message: "login success", token: token, user:{
            Username: user.Username,
            role: user.role
        }});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {checkPermission};
