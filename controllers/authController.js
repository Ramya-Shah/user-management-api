const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const signup = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send('User already exists');
        const user = new User({ name, email, password, role });
        await user.save();
        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (err) {
        next(err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send('User does not exist');
        const validPassword = await user.comparePassword(password);
        if (!validPassword) return res.status(401).send('Invalid password');
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
}

module.exports = { signup, login }


