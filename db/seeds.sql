INSERT INTO department(department_name)
VALUES
    ('Sales'),
    ('Legal'),
    ('Engineering');

INSERT INTO employee_role(title, salary, department_id)
VALUES
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 3),
    ('Software Engineer', 120000, 3),
    ('Account Manager', 160000, 2);

INSERT INTO employee(first_name, last_name, employee_role_id, manager_id)
VALUES
    ('Mike', 'Chan', 4, 4),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 2, 2),
    ('Kunal', 'Singh', 1 , 4);