DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE employee_role( 
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    employee_role_id INTEGER,
    CONSTRAINT fk_employee_role FOREIGN KEY (employee_role_id) REFERENCES employee_role(id),
    manager_id INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES Employees(id) ON DELETE SET NULL
)