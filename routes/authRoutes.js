const express = require('express');
const {signup,login} = require('../controllers/authController');
const {signupValidation,loginValidation} = require('../validators/authValidator');
const {validate} = require('../validators/validate');
const authRouter = express.Router();

authRouter.post('/signup',signupValidation,validate,signup);
authRouter.post('/login',loginValidation,validate,login);
module.exports = authRouter;