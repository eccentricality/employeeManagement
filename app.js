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
};

const deptView = (res) => {
    let query = "SELECT dept_name FROM department";
    connection.query(query, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].name);
        }
    });
};

const managerView = (res) => {
    let query = "SELECT mgr_id, first_name, last_name FROM employee WHERE mgr_id IN (SELECT mgr_id FROM employee WHERE mgr_id IS NOT NULL)";
    connection.query(query, (err, res) => {
        if (err) throw err;

        for (let i = 0; i < res.lenght; i++) {
            console.log(
                res[i].first_name + " " +
                res[i].last_name + " ID: " +
                res[i].id
            );
        }
    });
    menu();
};

const addEmployee = () => {
    inquirer.prompt({
        name: "addEmployee",
        type: "input",
        message: "Enter First and Last Name"
    })
    .then((response) => {
        let name = answer.addEmployee;
        let firstLastName = name.split(" ");
        let query = "INSERT INTO employee (first_name, last_name) VALUES ?";
        connection.query(query, [[firstLastName]], (err, res) => {
            if (err) throw err;
            console.log(err);
        });
        employee();
    });
};

const removeEmployee = () => {
    inquirer.prompt({
        name: "removeEmployee",
        type: "input",
        message: "Which Employee would you like to remove?"
    })
    .then(() => {
        let query = "DELETE FROM employee WHERE ?";
        let deleteId = Number(choice.removeEmployee);
        connection.query(query, { id: deleteId }, (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                console.log(res[i].removeEmployee);
            }

        });
        employee();
    });
};

const updateEmployee = () => {
    inquirer.prompt({
        name: "updateEmployee",
        type: "input",
        message: "Enter Employee ID"
    })
    .then ((choice) => {
        let id = choice.id;

        inquirer.prompt({
            name: "roleId",
            type: "input",
            message: "Enter Role ID"
        })
        .then((choice) => {
            let employeeId = choice.employeeId;
            let query = "UPDATE employee SET role_id=? WHERE id=?";
            connection.query(query, [employeeId, id], (err, res) => {
                if (err) throw err;
            });
        });
        employee();
    });
};

const updateManager = () => {
    inquirer.prompt({
        name: "updateManager",
        type: "input",
        message: "Which Employee's Manager would you like to update?"
    })
    .then(() => {
        let query = "SELECT manager_id FROM employee WHERE ?";
        connection.query(query, (err, res) => {
            if (err) throw err;

            for (let i = 0; i < res.length; i++) {
                console.log(res[i].employee);
            };
        });
        employee();
    });
};