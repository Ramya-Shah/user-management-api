const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const authMiddleware =async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).send('Unauthorized, no token provided');
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user) return res.status(401).send('Unauthorized, invalid token');
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    }catch(err){
        return res.status(401).send('Unauthorized, invalid token');
    }
}

module.exports = {authMiddleware};