const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
const bodyParser = require('body-parser');


const app = express();

app.use(cors());

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  password: '',      
  database: 'ramy',  
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);
  });
});


app.get('/api/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Database query error');
      return;
    }
    res.json(results);
  });
});


const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
