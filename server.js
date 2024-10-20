const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'techy_software'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, message], (err, result) => {
        if (err) throw err;
        console.log('Feedback submitted');
        res.send('Feedback submitted successfully');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
