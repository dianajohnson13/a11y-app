const express = require("express");
const pa11y = require("pa11y");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/test', async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: 'Missing URL' })
  } else {
    const results = await pa11y(req.query.url)
    res.status(200).json(results)
  }
});
