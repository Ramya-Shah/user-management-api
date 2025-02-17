const User = require('../models/user');

const createUser = async (req, res, next) => {
    try{
        const { name, email, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send('User already exists');
        const password = 'password123'; 
        const user = new User({ name, email, password,role });
        await user.save();
        res.status(201).json({ user });
    }catch(err){
        next(err);
    }
}

const getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find().select(-'password');
        res.status(200).json({ users });
    }catch(err){
        next(err);
    }
}

const getUserById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id).select(-'password');
        if (!user) return res.status(404).send('User not found');
        res.status(200).json({ user });
    }catch(err){
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { name, email, role } = req.body;
        const user = await User.findByIdAndUpdate(id, { name, email, role }, { new: true,runValidators: true }).select(-'password');
        if (!user) return res.status(404).send('User not found');
        res.status(200).json({ user });
    }catch(err){
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id)
        if (!user) return res.status(404).send('User not found');
        res.status(204).json({"msg": 'User deleted successfully'});
    }catch(err){
        next(err);
    }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };