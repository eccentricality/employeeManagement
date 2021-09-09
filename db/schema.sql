DROP DATABASE IF EXISTS jediDB;

CREATE DATABASE jediDB;

USE jediDB;

CREATE TABLE department
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role
(
    id int NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    salary int NOT NULL,
    dept_id integer(10) NOT NULL,
    PRIMARY KEY (id),
    INDEX dep_ind (department_id),
    CONSTRAINT fork_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE CASCADE
);

CREATE TABLE employee
(
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    role_id INT (20) NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fork_role
        FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE CASCADE,
    manager_id int NOT NULL,
    INDEX mgr_ind (manager_id),
    CONSTRAINT fork_manager
        FOREIGN KEY (manager_id)REFERENCES employee(id)
        REFERENCES employee(id)
        ON DELETE SET NULL,
    PRIMARY KEY (id)
);