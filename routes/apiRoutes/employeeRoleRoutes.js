const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// get all roles
router.get('/role', (req, res) => {
    const sql = `SELECT employee_role.title, employee_role.id as role_id, employee_role.salary, department.department_name as department_name
    FROM employee_role
    JOIN department ON employee_role.department_id = department.id;`;
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


module.exports = router;