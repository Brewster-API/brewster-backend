import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import drinksController from './controllers/drinks.js';
import usersController from './controllers/users.js';
import favoritesController from './controllers/favorites.js';
import githubAuthController from './controllers/githubAuth.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth/favorites', favoritesController);
app.use('/api/v1/auth/drinks', drinksController);
app.use('/api/v1/drinks', drinksController);
app.use('/api/v1/auth', usersController);
app.use('/api/v1/githubauth', githubAuthController);

// app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
