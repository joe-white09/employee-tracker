const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// gets employee id, first and last name, and role
router.get('/employee', (req, res) => {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id,
    employee_role.title AS job_title FROM employees
    LEFT JOIN employee_role
    ON employees.employee_role_id = employee_role.id;`;
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

// get employees by manager
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT
        employee.id,
        CONCAT(employee.first_name , ' ' , employee.last_name) as employee_name,
        CONCAT(manager.first_name , ' ' , manager.last_name) as manager_name
        FROM employees employee
        LEFT OUTER JOIN employees manager
        ON employee.manager_id = manager.id;`;
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

// create a new employee
router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO Employees (first_name, last_name, employee_role_id, manager_id) VALUES(?,?,?,?);`;
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
    const sql = `UPDATE Employees SET manager_id = ?
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
            data: req.body.manager_id,
            changes: result.affectedRows
            });
        }
    });
});

router.delete('/employee/:id', (req, res) => {
    const sql = `UPDATE Employees SET manager_id = NULL
                WHERE id = ?;`;
    const params = [req.params.id];

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
            data: req.body.manager_id,
            changes: result.affectedRows
            });
        }
    });
});



module.exports = router;