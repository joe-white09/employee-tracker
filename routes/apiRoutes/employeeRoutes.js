const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// gets employee id, first and last name, and role
router.get('/employee', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id,
    employee_role.title AS job_title FROM employee
    LEFT JOIN employee_role
    ON employee.employee_role_id = employee_role.id;`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
            res.json({
                message: 'sucess',
                data: rows
        });
    });
});

// create a new employee
router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, employee_role_id, manager_id) VALUES(?,?,?,?);`;
    const params = [
        body.first_name,
        body.last_name,
        body.employee_role_id,
        body.manager_id
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

router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE employee SET manager_id = ?
                WHERE id = ?;`;
    const params = [req.body.manager_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({ 
                message: 'Employee not found'
            });
        } else {
        res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
            });
        }
    });
});



module.exports = router;