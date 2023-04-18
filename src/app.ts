import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/connectDB';

import { cronJobDeleteExpiredTokens } from './services/cron';
import * as middlewares from './middlewares';
import api from './api';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

cronJobDeleteExpiredTokens.start();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

connectDB().then(() => {
    app.use('/api/v1', api);

    app.use(middlewares.notFound);
    app.use(middlewares.errorHandler);
});

export default app;
