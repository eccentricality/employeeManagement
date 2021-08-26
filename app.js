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
                "View Employees",
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
    switch (res.choice) {
        case "View Employees": employeeView();
        break;

        case "View ALL Employees by DEPT": deptView();
        break;

        case  "View ALL Employees by MANAGER": managerView();
        break;

        case "ADD Employee": addEmployee();
        break;

        case "REMOVE Employee": removeEmployee();
        break;

        case "UPDATE Employee ROLE": updateEmployee();
        break;

        case "UPDATE Employee MANAGER": updateManager();
        break;

        case "EXIT": connection.end();
        break;
    }
};

const employeeView = (inputs = []) => {
    inquirer.prompt({
        name: "employeeView",
        type: "input",
        message: "Enter Last Name to begin"
    })
    .then((choice) => {
        let query = "SELECT first_name, last_name, id FROM employee WHERE ?";
        connection.query(query, { last_name: choice.employeeView}, (err, res) => {
            if (err) throw err;

            for (let i = 0; i < res.lenght; i++) {
                console.log(
                    " First Name: " + res[i].first_name +
                    " Last Name: " + res[i].last_name +
                    " ID: " + res[i].id
                );
            };
        });
        employee();
    });
}

