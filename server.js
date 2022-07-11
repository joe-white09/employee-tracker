
const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    promptUser();
});

// Inquirer prompt 
const promptUser = () => {
    console.log(`
    ================
    Employee Tracker
    ================`);
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View All Departments', 'View all Roles', 'View all Employees',
                'Add a Department', 'Add a role', 'Add an employee', 'Update an employee role'
                ],
        }
    ])
    .then( answer => {
        if ( answer.options === 'View All Departments') {
            getDepartments();
        }
        if ( answer.options === 'View all Employees') {
            getEmployees();
            
        }
        if ( answer.options === 'View all Roles') {
            getRoles();
            
        }
        if (answer.options === 'Add a Department'){
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'department_name',
                    message: 'What is the name of this department?',
                    validate: department_nameInput => {
                        if (department_nameInput) {    
                            return true;
                        }else {
                            console.log('You must enter a department name');
                            return false;
                        }
                    }
                }     
            ])
            .then(({department_name}) => {
                createDepartment(department_name)
            });
            
        }
        if (answer.options === 'Add a role') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title of this role?',
                    validate: titleInput => {
                        if (titleInput) {    
                            return true;
                        }else {
                            console.log('You must enter a department name');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        } else {
                            console.log('You must enter the salary for this role');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'What is the department id for this role?',
                    validate: department_idInput => {
                        if (department_idInput) {
                            return true;
                        } else {
                            console.log('You must enter the department id');
                            return false;                        }
                    }
                }
            ])
            .then(({title, salary, department_id}) => {
                createRole(title, salary, department_id);
            });
        }
        if (answer.options === 'Add an employee') {
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name?",
                    validate: first_nameInput => {
                        if (first_nameInput) {    
                            return true;
                        }else {
                            console.log('You must enter a first name');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name?",
                    validate: last_nameInput => {
                        if (last_nameInput) {
                            return true;
                        } else {
                            console.log('You must enter a last name');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'employee_role_id',
                    message: "What is the id for this employee's role?",
                    validate: role_idInput => {
                        if (role_idInput) {
                            return true;
                        } else {
                            console.log('You must enter the department id');
                            return false;                        }
                    }
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: "What is the id for this employee's Manager?", 
                }
            ])
            .then(({first_name, last_name, employee_role_id, manager_id}) => {
                createEmployee(first_name, last_name, employee_role_id, manager_id)
            });
        }
    })
};

// shows all department names
const getDepartments = () =>{
    const sql = `select * from departments;`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log('Error fetching database');
            promptUser();
        }
        console.table(rows)
        promptUser();
        });
};

const createDepartment = (department_name) => {
    const sql = `INSERT INTO departments (department_name) VALUES(?);`;
    const params = [
        department_name
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log('Error posting to database');
            promptUser();
        }
        console.log('success')
        promptUser();
    });
};

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
            console.log('Error fetching database');
            promptUser();
        }
        console.table(rows)
        promptUser();
    });
};

// create a new employee
const createEmployee = (first_name, last_name, employee_role_id, manager_id) => {
    const sql = `INSERT INTO Employees (first_name, last_name, employee_role_id, manager_id) VALUES(?,?,?,?);`;
    const params = [
        first_name,
        last_name,
        employee_role_id,
        manager_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log('Error posting to database');
            promptUser();
        }
        console.log('success')
        promptUser();
    });
};

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
            console.log('Error fetching database')
            promptUser();
        }
        console.table(rows)
        promptUser();
    });
};

// create a new role
const createRole = (title, salary, department_id) => {
    const sql = `INSERT INTO employee_role (title, salary, department_id) VALUES(?,?,?);`;
    const params = [
        title,
        salary,
        department_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log('Error posting to database');
            promptUser();
        }
        console.log('success')
        promptUser();
    });
};





