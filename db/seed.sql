USE jedidb;

INSERT INTO departments (name)
VALUES
    ('Council'),
    ('Assault Team'),
    ('Exploration Corps'),
    ('Temple Guardians'),
    ('Academy');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Grand Master', 1000000, 1),
    ('Master of the Order', 800000, 1),
    ('Jedi Council Member', 600000, 1),
    ('Jedi Master', 400000, 2),
    ('Jedi Sentinel', 350000, 2),
    ('Jedi Guardian', 350000, 2),
    ('Jedi Consular', 350000, 3),
    ('Jedi Knight', 250000, 3),
    ('Jedi Service Corps', 125000, 4),
    ('Padawan', 90000, 5),
    ('Youngling', 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Yoda', '', 1, 1),
    ('Mace', 'Windu', 2, 1),
    ('Plo', 'Koon', 3, 2),
    ('Ki-Adi', 'Mundi', 3, 2),
    ('Saesee', 'Tiin', 3, 2),
    ('Qui-Gon', 'Jinn', 4, 1),
    ('Obi-Wan', 'Kenobi', 4, 1),
    ('Morrit', 'Ch\'gally', 5, 2),
    ('Bastila', 'Shan', 5, 2),
    ('Shaak', 'Ti', 6, 2),
    ('Kit', 'Fisto', 6, 2),
    ('Anakin', 'Skywalker', 6, 2),
    ('Luminara', 'Unduli', 7, 2),
    ('Barriss', 'Offee', 7, 2),
    ('Ezra', 'Bridger', 8, 2),
    ('Ven', 'Zallow', 8, 2),
    ('Jocasta', 'Nu', 9, 1),
    ('Ferren', 'Barr', 9, 3),
    ('Ahsoka', 'Tano', 10, 3),
    ('Luke', 'Skywalker', 11, 6),
    ('Leia', 'Skywalker', 11, 6);