const db = require('../../db/connection');

// gets employee id, first and last name, and role
const getEmployees = () => {
    const sql = `SELECT
                employee.id,
                employee.first_name ,
                employee.last_name,
                CONCAT(manager.first_name, ' ' , manager.last_name) as manager,
                employee_role.title AS job_title,
                employee_role.salary AS salary,
                departments.department_name AS department  
                FROM employees employee
                LEFT OUTER JOIN employees manager
                ON employee.manager_id = manager.id
                LEFT JOIN employee_role
                ON employee.employee_role_id = employee_role.id
                JOIN departments
                ON employee_role.department_id = departments.id
                ORDER BY employee.id ASC;`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
    });
};

// get employees by manager
// router.get('/employee/:id', (req, res) => {
//     const sql = `SELECT
//         employee.id,
//         CONCAT(employee.first_name , ' ' , employee.last_name) as employee_name,
//         CONCAT(manager.first_name , ' ' , manager.last_name) as manager_name
//         FROM employees employee
//         LEFT OUTER JOIN employees manager
//         ON employee.manager_id = manager.id;`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// create a new employee
const createEmployee = () => {
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
};

// router.put('/employee/:id', (req, res) => {
//     const sql = `UPDATE Employees SET manager_id = ?
//                 WHERE id = ?;`;
//     const params = [req.body.manager_id, req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         } else if (!result.affectedRows) {
//             res.json({ 
//                 message: 'Employee not found'
//             });
//         } else {
//         res.json({
//             message: 'success',
//             data: req.body.manager_id,
//             changes: result.affectedRows
//             });
//         }
//     });
// });

// router.delete('/employee/:id', (req, res) => {
//     const sql = `UPDATE Employees SET manager_id = NULL
//                 WHERE id = ?;`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         } else if (!result.affectedRows) {
//             res.json({ 
//                 message: 'Employee not found'
//             });
//         } else {
//         res.json({
//             message: 'success',
//             data: req.body.manager_id,
//             changes: result.affectedRows
//             });
//         }
//     });
// });


module.exports = {getEmployees, createEmployee};