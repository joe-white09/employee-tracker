const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// gets employee id, first and last name, and role
router.get('/employee', (req, res) => {
    const sql = `SELECT Employees.id, Employees.first_name, Employees.last_name, Employees.manager_id,
    employee_role.title AS job_title FROM Employees
    LEFT JOIN employee_role
    ON Employees.employee_role_id = employee_role.id;`;
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
    employee.Id,
        employee.first_name,
        employee.manager_id,
        manager.first_name as ManagerName
FROM Employees employee
LEFT OUTER JOIN Employees manager
ON employee.manager_id = manager.id;`;
    const params = []
})

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