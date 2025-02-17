const express = require('express');
const {authMiddleware} = require('../middlewares/authMiddleware');
const {createUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController');
const {createUserValidation, updateUserValidation} = require('../validators/userValidator');
const {validate} = require('../validators/validate');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.post('/',createUserValidation,validate, createUser);
userRouter.get('/',getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUserValidation,validate, updateUser);
userRouter.delete('/:id',adminMiddleware, deleteUser);

module.exports = userRouter;







