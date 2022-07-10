
const db = require('../../db/connection');

// shows all department names
const getDepartments = () =>{
    const sql = `select * from departments;`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);
        });
};

// get department by id
// router.get('/department/:id', (req, res) => {
//     const sql = `SELECT *
//                 FROM employee_role
//                 WHERE employee_role.department_id = ?;`;
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

const createDepartment = () => {
    const sql = `INSERT INTO departments (department_name) VALUES(?);`;
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
};

module.exports = {getDepartments, createDepartment};