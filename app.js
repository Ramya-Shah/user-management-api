const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());
// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use(errorHandler);

module.exports = app;