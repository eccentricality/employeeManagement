const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'jedidb',
});

const employee = () => {
    inquirer.prompt([
        {
            type: "list",
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
        switch (res.choice) {
            case "View Employees": {
                return viewAll();
            }

            case "View ALL Employees by DEPT": {
                return deptView();
            }

            case  "View ALL Employees by MANAGER": {
                return managerView();
            }

            case "ADD Employee": {
                return addEmployee();
            }

            case "REMOVE Employee": {
                return removeEmployee();
            }

            case "UPDATE Employee ROLE": {
                return updateEmployee();
            }

            case "UPDATE Employee MANAGER": {
                return updateManager();
            }

            case "EXIT": {
                return process.exit();
            }
        }
    });
};

const viewAll = () => {
    connection.query(
        `SELECT 
            allEmployees.id AS ID,
            allEmployees.first_name AS First_Name,
            allEmployees.last_name AS Last_Name,
            allEmployees.title AS Title,
            allEmployees.name AS Department,
            allEmployees.salary AS Salary,
            allEmployees.manager AS Manager
        FROM 
            (SELECT 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                role.department_id, 
                departments.name, 
                role.salary, 
                employee.manager_id,
                concat(m.first_name," ", m.last_name) manager
            FROM employee
            LEFT JOIN employee m ON m.id = employee.manager_id
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN departments ON role.department_id = departments.id)
        AS allEmployees`,
        (err, employees) => {
            if (err) throw err;
            console.log('VIEWING ALL EMPLOYEES');
            console.log(employees);
            employee();
        }
    );
};

const deptView = () => {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Which department would you like to search?",
                choices() {
                    const choicesArray = [];
                    results.forEach((department) => {
                        choicesArray.push(`${department.name}`);
                    });
                    return choicesArray;
                },
                name: "choseDept"
            },
        ])
        .then((selection) => {
            connection.query(
                `SELECT 
                    allEmployees.id AS ID,
                    allEmployees.first_name AS First_Name,
                    allEmployees.last_name AS Last_Name,
                    allEmployees.title AS Title,
                    allEmployees.salary AS Salary,
                    allEmployees.manager AS Manager
                FROM 
                    (SELECT 
                        employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        role.department_id, 
                        departments.name, 
                        role.salary, 
                        employee.manager_id,
                        concat(m.first_name," ", m.last_name) manager
                    FROM employee
                    LEFT JOIN employee m ON m.id = employee.manager_id
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN departments ON role.department_id = departments.id)
                AS allEmployees
                WHERE ?`,
                {name: selection.choseDept},
                (err, res) => {
                    if (err) throw err;
                    console.log("Employees in the ${res.choseDept} department are as follow:");
                    console.log(res);
                    employee();
                } 
            );
        });
    });
};

const managerView = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                message: "Which manager would you like to search by?",
                choices() {
                    const choicesArray = [];
                    results.forEach((employee) => {
                        choicesArray.push(`${employee.first_name} ${employee.last_name}`);
                    });
                    return choicesArray;
                },
                name: "choseMgr"
            },
        ])
        .then((selection) => {
            connection.query(
                `SELECT 
                    allEmployees.id AS ID,
                    allEmployees.first_name AS First_Name,
                    allEmployees.last_name AS Last_Name,
                    allEmployees.title AS Title,
                    allEmployees.salary AS Salary,
                    allEmployees.manager AS Manager
                FROM 
                    (SELECT 
                        employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        role.department_id, 
                        departments.name, 
                        role.salary, 
                        employee.manager_id,
                        concat(m.first_name," ", m.last_name) manager
                    FROM employee
                    LEFT JOIN employee m ON m.id = employee.manager_id
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN departments ON role.department_id = departments.id)
                AS allEmployees
                WHERE ?`,
                {Manager: selection.choseMgr},
                (err, res) => {
                    if (err) throw err;
                    console.log("Employees managed by ${selection.choseMgr} are as follow:");
                    console.log(res);
                    employee();
                } 
            );
        });
    });
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

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    employee();
});