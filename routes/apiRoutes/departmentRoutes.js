const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// shows all department names
router.get('/departments', (req, res) => {
    const sql = `select department_name from department;`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.post('/departments', ({ body }, res) => {
    const sql = `INSERT INTO department (department_name) VALUES(?);`;
    const params = [
        body.department_name
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});




module.exports = router;