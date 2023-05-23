import express, { Request, Response } from 'express';
import pa11y from 'pa11y';

const app = express();
export default app;

// routes to be moved
app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from server!" });
});

app.get('/api/test', async (req: Request, res: Response) => {
    const url = req.query.url as string;
    if (!url) {
      res.status(400).json({ error: 'Missing URL' });
    } else {
      const results = await pa11y(url);
      res.status(200).json({results});
    }
});