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

INSERT INTO employee (first_name, last_name, mgr_id)
VALUES
    ('Anakin', 'Skywalker', NULL),
    ('Ahsoka', 'Tano', NULL),
    ('Mace', 'Windu', 3),
    ('Master', 'Yoda', 1),
    ('Obi-Wan', 'Kenobi', 5);