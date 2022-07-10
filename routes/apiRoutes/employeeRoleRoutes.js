const db = require('../../db/connection');

// get all roles
const getRoles = () => {
    const sql = `SELECT
                employee_role.title, 
                employee_role.id as role_id, 
                employee_role.salary, 
                departments.department_name as department_name
                FROM employee_role
                JOIN departments ON employee_role.department_id = departments.id;`;
                
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
    });
};

// create a new role
const createRole = () => {
    const sql = `INSERT INTO employee_role (title, salary, department_id) VALUES(?,?,?);`;
    const params = [
        body.title,
        body.salary,
        body.department_id
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



module.exports = {getRoles, createRole};