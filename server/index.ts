import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import a11yTestRouter from './routes/a11yTestRouter';
import usersRouter from './routes/usersRouter';
import authRouter from './routes/authRouter';

dotenv.config();

const app = express();

const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());

app.use('/api/a11y', a11yTestRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

export default app;
