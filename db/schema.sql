DROP DATABASE IF EXISTS jedidb;

CREATE DATABASE jedidb;

USE jedidb;

CREATE TABLE departments
(
    id INT UNSIGNED AUTO_INCREMENT,
    name varchar(20) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role
(
    id INT UNSIGNED AUTO_INCREMENT,
    title varchar(100) UNIQUE NOT NULL,
    salary INT UNSIGNED NOT NULL,
    department_id INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE CASCADE
);

CREATE TABLE employee 
(
    id INT UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE CASCADE,
    manager_id INT UNSIGNED,
    INDEX manager_ind (manager_id),
    CONSTRAINT fk_manager
        FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL,
    PRIMARY KEY (id)
);