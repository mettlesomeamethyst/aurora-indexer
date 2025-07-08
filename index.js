const express = require('express');
const cors = require('cors');
const gplay = require('google-play-scraper');

const app = express();
const PORT = process.env.PORT || 7860;  // Required for Hugging Face

app.use(cors());

app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const results = await gplay.search({ term: query, num: 10 });
    const apps = results.map(app => ({
      name: app.title,
      package: app.appId,
    }));
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch apps' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
