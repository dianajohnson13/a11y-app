import express, { json } from 'express';
import cors from 'cors';

import a11yTestRouter from './routes/a11yTestRouter';
import usersRouter from './routes/usersRouter';

const app = express();

const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());

app.use('/api/a11y', a11yTestRouter);
app.use('/api/users', usersRouter);

export default app;
