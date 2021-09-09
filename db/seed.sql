USE jediDB;

INSERT INTO departments (name)
VALUES
    ('Council'),
    ('Assault Team'),
    ('Exploration Corps'),
    ('Temple Guardians'),
    ('Academy');

INSERT INTO role (title, salary, dept_id)
VALUES
    ('Grand Master', 1000000, 1),
    ('Master of the Order', 800000, 1),
    ('Jedi Council Member', 600000, 1),
    ('Jedi Master', 400000, 2),
    ('Jedi Sentinel', 350000, 2),
    ('Jedi Guardian', 350000, 2),
    ('Jedi Consular', 350000, 3),
    ('Jedi Knight', 250000, 3),;
    ('Jedi Service Corps', 125000, 4),;
    ('Padawan', 90000, 5),;
    ('Youngling', 50000, 5);

INSERT INTO epmloyee (first_name, last_name, role_id, manager_id)
VALUES
    ('Yoda', '', 1, 5),
    ('Mace', 'Windu', 2, 4),
    ('Plo', 'Koon', 3, 3),
    ('Ki-Adi', 'Mundi', 3, 2),
    ('Saesee', 'Tiin', 3, 1),

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Qui-Gon', 'Jinn', 4),
    ('Obi-Wan', 'Kenobi', 4),
    ('Morrit', 'Ch\'gally', 5),
    ('Bastila', 'Shan', 5),
    ('Shaak', 'Ti', 6),
    ('Kit', 'Fisto', 6),
    ('Anakin', 'Skywalker', 6),
    ('Luminara', 'Unduli', 7),
    ('Barriss', 'Offee', 7),;
    ('Ezra', 'Bridger', 8),;
    ('Ven', 'Zallow', 8),;
    ('Jocasta', 'Nu', 9),;
    ('Ferren', 'Barr', 9),;
    ('Ahsoka', 'Tano', 10),;
    ('Luke', 'Skywalker', 11),;
    ('Leia', 'Skywalker', 11);