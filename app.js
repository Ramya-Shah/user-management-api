const express = require('express');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use(errorHandler);

module.exports = app;