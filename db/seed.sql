USE employee_db;

INSERT INTO department (dept_name)
VALUES
    ('Sales'),
    ('Software'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, dept_id)
VALUES
    ('Sales Manager', 150000, 1),
    ('Sales Rep', 90000, 1),
    ('Legal PM', 250000, 4),
    ('Attorney', 150000, 4),
    ('Jr Developer', 90000, 2),
    ('Sr Developer', 130000, 2),
    ('Acct Manager', 150000, 3),
    ('Payroll', 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, mgr_id)
VALUES
    ('Master', 'Yoda', 1, NULL),
    ('Obi-Wan', 'Kenobi', 4, 3),
    ('Anakin', 'Skywalker', 5, NULL),
    ('Ahsoka', 'Tano', 7, NULL),
    ('Mace', 'Windu', 6, 5)