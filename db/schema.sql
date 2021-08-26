DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department
(
    dept_id int NOT NULL AUTO_INCREMENT,
    dept_name varchar(20) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE role
(
    role_id int NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    salary int NOT NULL,
    dept_id integer(10) NOT NULL,
    PRIMARY KEY (role_id)
);

CREATE TABLE employee
(
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    mgr_id INT (20) NULL,
    PRIMARY KEY (id)
);