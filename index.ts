import express, { Request, Response } from 'express';
const pa11y = require('pa11y');

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from server!" });
});

app.get('/api/test', async (req: Request, res: Response) => {
  if (!req.query.url) {
    res.status(400).json({ error: 'Missing URL' });
  } else {
    const results = await pa11y(req.query.url);
    res.status(200).json({results});
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});