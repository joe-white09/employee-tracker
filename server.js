
const express = require('express');
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const {getDepartments, createDepartment} = require('./routes/apiRoutes/departmentRoutes');
const {getEmployees, createEmployee} = require('./routes/apiRoutes/employeeRoutes');
const {getRoles, createRole} = require('./routes/apiRoutes/employeeRoleRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use('/api', apiRoutes);


// start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    promptUser();
});


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
            choices: ['Add a Department', 'Add an employee role', 'Add an employee',
                    'View All Departments', 'View all employee roles', 'View all employees'],
        }
    ])
    .then( answer => {
        if ( answer.options === 'View All Departments') {
            getDepartments(); 
            promptUser();
        }
        if ( answer.options === 'View all employees') {
            getEmployees()
            promptUser();
        }
        if ( answer.options === 'View all employee roles') {
            getRoles()
            promptUser();
        }
    })
};

