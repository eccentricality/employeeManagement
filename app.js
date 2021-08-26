// dependencies
const fs = require('fs');
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3006,
    user: "root",
    password: "",
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    employee();
});

const employee = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Your options:",
            choices: [
                "VIEW ALL Employees",
                "View ALL Employees by DEPT",
                "View ALL Employees by MANAGER",
                "ADD Employee",
                "REMOVE Employee",
                "UPDATE Employee ROLE",
                "UPDATE Employee MANAGER",
                "EXIT"
            ],
            name: "choice"
        }
    ])
    .then((res) => {
        console.log(res.choice);
    });
};