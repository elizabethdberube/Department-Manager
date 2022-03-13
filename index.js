const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: '1234',
    database: 'department_db'
},
    console.log('Connected to database.')
);

//the main loop that controls the flow of the whole thing.
const mainLoop = () => {


    inquirer.prompt([
        {
            type: 'list',
            message: 'What would like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit'],
            name: 'selectToDo',

        }
    ])
        .then(({ selectToDo }) => {
            if (selectToDo == "'view all departments") {
                viewAllDepartments().then(mainLoop);

            }

            else if (selectToDo == "view all roles") {
                viewAllRoles().then(mainLoop);

            }

            else if (selectToDo == "view all employees") {
                viewAllEmployees().then(mainLoop);

            }

            else if (selectToDo == "add a department") {
                addDepartment().then(mainLoop);

            }

            else if (selectToDo == "add a role") {
                addRole().then(mainLoop);

            }

            else if (selectToDo == "add an employee") {
                addEmployee();

            }

            else if (selectToDo == "update an employee role") {
                updateEmployeeRole().then(mainLoop);

            }

            else if (selectToDo == "quit") {
                console.log("The End");

                return;
            }
        });
}

const viewAllDepartments = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
    });

}



const viewAllRoles = () => {
    db.query('SELECT roles.title AS titles, roles.id AS roles-ID, departments.department_name AS Department, roles.salary As Salaries FROM roles JOIN departments ON roles.title = departments.id;', function (err, results) {
        console.log(results);
    });

}

const viewAllEmployees = () => {
    db.query('SELECT employees.id AS employee, employees.first_name AS First-Name, employees.last_name AS Last-Name, roles.title AS Title, departments.department_name AS Department, roles.salary As Salaries, employees.manager_id AS Manager FROM employees JOIN roles ON employees.id = roles.id JOIN departments ON departments.id = roles.id;', function (err, results) {
        console.log(results);
    });

}

const addDepartment = () => {


    inquirer.prompt([
        {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'newDepartment',
        }
    ])
        .then((newDepartment) => {




        });
}


