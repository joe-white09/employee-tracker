const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'wJhOiStEePH!90',
        database: 'employee_tracker'
    },
    console.log('Connected to employee_tracker database.')
);

module.exports = db;