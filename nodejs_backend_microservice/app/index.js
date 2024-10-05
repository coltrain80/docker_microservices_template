// Import required modules
const express = require('express');
const { Pool } = require('pg');

// Create an instance of Express
const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: 'user',
  host: 'postgres',  // Service name from docker-compose.yml
  database: 'backend_db',
  password: 'password',
  port: 5432,
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.send({ status: 'API is running' });
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update an existing user
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(`User with ID ${id} deleted`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
