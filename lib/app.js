import express from 'express';
import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import drinksController from './controllers/drinks.js';
import usersController from './controllers/users.js';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/drinks', drinksController);
app.use('/api/v1/auth', usersController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
