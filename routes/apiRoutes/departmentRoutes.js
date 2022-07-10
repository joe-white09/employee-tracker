const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// shows all department names
router.get('/department', (req, res) => {
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

// get department by id
router.get('/department/:id', (req, res) => {
    const sql = `SELECT *
                FROM employee_role
                WHERE employee_role.department_id = ?;`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
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

router.post('/department', ({ body }, res) => {
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