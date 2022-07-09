const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'wJhOiStEePH!90',
        database: 'election'
    },
    console.log('Connected to election database.')
);

module.exports = db;