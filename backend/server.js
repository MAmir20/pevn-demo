// server.js
const express = require('express');
const cors = require('cors');
const pool = require('./database/db');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Search route
app.get('/search', async (req, res) => {
  const query = req.query.q;
  
  try {
    console.log('query', query);
    
    const result = await pool.query('SELECT * FROM products WHERE name ILIKE $1', [`%${query}%`]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
