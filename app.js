const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student_db'
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
  });

// Inscription d'un utilisateur
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send('User registered successfully!');
  });
});

// Récupération des notes (vulnérable à SQL Injection)
app.get('/grades', (req, res) => {
  const { username } = req.query;
  const query = `SELECT * FROM grades WHERE username = '${username}'`;
  console.log('Executing query:', query);
  
  try {
    db.query(query, (err, result) => {
      if (err) {
        console.error('SQL Error:', err.message);
        return res.status(500).json({ error: err.message, query: query });
      }
      res.json(result);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Server running on port 3000');
});