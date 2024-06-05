const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res, next) => {
  try {
    const { developers } = req.body;
    if (!developers || !Array.isArray(developers)) {
      return res.status(400).json({ error: 'Invalid input: developers should be an array.' });
    }

    const results = await Promise.all(developers.map(async (developer) => {
      try {
        const response = await axios.get(`https://api.github.com/users/${developer}`);
        return { name: response.data.name, bio: response.data.bio };
      } catch (error) {
        console.error(`Error fetching data for ${developer}: ${error.message}`);
        return { name: null, bio: `Error fetching data for ${developer}` };
      }
    }));

    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
