const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        min:6,
        max:255
    },
    password:{
        type: String,
        required: true,
        min:8
    },
    role:{
        type: String,
        required: true,
        enum: ['user', 'admin']
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User