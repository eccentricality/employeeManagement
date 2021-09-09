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
                return updateRole();
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
    connection.query(
        `SELECT 
            title AS name, 
            id AS value 
        FROM role`, 
        (err, choices) => {
            if (err) throw err;
        
            inquirer.prompt([
                {
                    type: "input",
                    message: "What is the new employee's first name?",
                    name: "first_name"
                },
                {
                    type: "input",
                    message: "What is the new employee's last name?",
                    name: "last_name"
                },
                {
                    type: "list",
                    message: "What is the new employee's role?",
                    choices() {
                        return choices;
                    },
                    name: "role_id"
                }
            ])
            .then((selection) => {
                connection.query('SELECT * FROM employee', (err, results) => {
                    if (err) throw err;

                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Who is the employee's manager?",
                            choices() {
                                const choicesArray = [];
                                results.forEach(({first_name, last_name}) => {
                                    choicesArray.push(`${first_name} ${last_name}`);
                                });
                                return choicesArray;
                            },
                            name: "manager"
                        }
                    ])
                    .then((choice) => {
                        let chosenMgr;
                        results.forEach((employee) => {
                            if(`${employee.first_name} ${employee.last_name}` === choice.manager) {
                                chosenMgr = employee;
                            }
                        });
                        selection.manager_id = chosenMgr.id;

                        connection.query(
                            `INSERT INTO employee
                            SET ?`,
                            selection,
                            (err, results) => {
                                if (err) throw err;
                                console.log("Successfully added ${selection.first_name} ${selection.last_name} as an employee!");
                                employee();
                            }
                        );
                    });
                });
            });
        }
    );
};

const removeEmployee = () => {
    connection.query(
        `SELECT *
        FROM employee`,
        (err, results) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee would you like to remove?",
                    choices() {
                        const choicesArray = [];
                        results.forEach(({first_name, last_name}) => {
                            choicesArray.push(`${first_name} ${last_name}`);
                        });
                        return choicesArray;
                    },
                    name: "removeEmp"
                }
            ])
            .then((selection) => {
                let chosenEmp;
                results.forEach((employee) => {
                    if(selection.removeEmp === `${employee.first_name} ${employee.last_name}`) {
                        chosenEmp = employee;
                    };
                });

                connection.query(
                    `DELETE FROM employee
                    WHERE ?`,
                    {id: chosenEmp.id},
                    (err, res) => {
                        if (err) throw err;
                        console.log("Removed ${selection.removeEmp} from the roster.");
                        employee();
                    }
                );
            });
        }
    );
};

const updateRole = () => {
    connection.query(
        `SELECT *
        FROM employee`,
        (err, results) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    message: "Which employee's role would you like to update?",
                    choices() {
                        const choicesArray = [];
                        results.forEach(({first_name, last_name}) => {
                            choicesArray.push(`${first_name} ${last_name}`);
                        });
                        return choicesArray;
                    },
                    name: "updateEmp"
                }
            ])
            .then((selection) => {
                let chosenEmp;
                results.forEach((employee) => {
                    if (selection.updateEmp === `${employee.first_name} ${employee.last_name}`) {
                        chosenEmp = employee;
                    };
                });

                connection.query(
                    `SELECT
                        title AS name,
                        id AS value
                    FROM role`,
                    (err, choices) => {
                        if (err) throw err;

                        inquirer.prompt([
                            {
                                type: "list",
                                message: "What is the employee's new role?",
                                choices() {
                                    return choices
                                },
                                name: "updateRole"
                            }
                        ])
                        .then((answer) => {
                            connection.query(
                                `UPDATE employee
                                SET role_id = ${answer.updateRole}
                                WHERE ?`,
                                {id: chosenEmp.id},
                                (err, res) => {
                                    if (err) throw err;
                                    console.log("Employee's role updated.");
                                    employee();
                                }
                            )
                        })
                    }
                )
            })
        }
    )
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