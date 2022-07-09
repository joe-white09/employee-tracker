const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


router.get('/employee', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name,
    employee_role.title AS job_title FROM employee
    employee.first_name AS manager from employee
    LEFT JOIN employee_role
    ON employee.employee_role_id = employee_role.id
    LEFT JOIN employee
    ON employee.manager_id = employee.manager_id;`
});
// // gets first and last name with role title
select employee.first_name, employee.last_name, employee_role.title as title
from employee
left join employee_role
on employee.employee_role_id = employee_role.id;




module.exports = router;