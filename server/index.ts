import express from 'express';

import a11yTestRouter from './routes/a11yTestRouter';

const app = express();

app.use('/api/a11y', a11yTestRouter);

export default app;
