const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');


async function viewAllDepartments() {

    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT * FROM departments;');
    console.table(results[0]);
}


async function viewAllRoles() {

    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT roles.title, departments.department_name, roles.salary,  roles.id AS role_id FROM roles JOIN departments ON departments.id = roles.id;');
    console.table(results[0]);
}

async function viewAllEmployees() {

    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, employees.first_name AS manager FROM employees JOIN roles ON employees.id = roles.id JOIN departments ON departments.id = roles.id;');
    console.table(results[0]);
}


async function addDepartment() {

    let answer = await inquirer.prompt([
        {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'newDepartment',
        }
    ])

    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let { newDepartment } = answer;
    let results = await connection.query(`INSERT INTO departments (department_name) VALUES (?);`, [newDepartment]);

}


async function addToRoles() {
    let answers = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of this role?',
            name: 'newRole',
        },
        {
            type: 'input',
            message: 'What is te salary for this role?',
            name: 'newSalary',
        },
        {
            type: 'list',
            message: 'What is the department for this role?',
            choices: ['Office Staff', 'Sales', 'Field Technicial Support', 'Accounting', 'Customer Service', 'Human Resources', 'IT', 'Security', 'quit'],
            name: 'dept',

        }
    ])

    const { newRole, newSalary, dept } = answers;

    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let firstQuery = await connection.query(`SELECT id FROM departments WHERE department_name = (?);`, [dept]);
    let deptID = firstQuery[0][0].id;
    // query database
    let results = await connection.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [newRole, newSalary, deptID]);

}

async function addToEmployees() {
    let answers = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'lastName',
        },

        {
            type: 'list',
            message: 'What is this employee\'s manager?',
            choices: ['George Smith', 'Rajesh Shah', 'Susan Ellison', 'David Emerson', 'Jennifer Day', 'Terri Adel', 'Tom Walk', 'Sarah Bell', 'quit'],
            name: 'manager',

        },

        {
            type: 'list',
            message: 'What is this employee\'s role?',
            choices: ['Office Manager', 'Assistant Office Manger', 'Salesman', 'Receptionist', 'Technician', 'Lead Technician', 'Accountant', 'quit'],
            name: 'role',

        }
    ])


    let { firstName, lastName, role, manager } = answers;
    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    let name_pieces = manager.split(' ');

    let first_name = name_pieces[0];
    let last_name = name_pieces[1];

    // query database
    let firstQuery = await connection.query(`SELECT id FROM employees WHERE first_name = ?;`, [first_name]);
    let managerID = firstQuery[0][0].id;
    // query database
    let secondQuery = await connection.query(`SELECT id FROM roles WHERE title = ?;`, [role]);
    let roleID = secondQuery[0][0].id;
    //Fix issue with adding employee to database
    let results = await connection.query(`INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, managerID, roleID]);

}


//TODO write this function. User can update an employee role then they select an employee to update and their new role and this information is updated in the database by id
async function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee\'s role/title?',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'lastName',
        },
        {
            type: 'input',
            message: 'What is the department id for this role?',
            name: 'newDept',
        }
    ])
    //TODO test this query
    //TODO this should add the role_id when they enter the role title. 
    //Also this should add the manager_id when they enter the manager name
    const { firstName, lastName, newDept } = results;
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    await connection.query(`INSERT INTO employees (id, ${firstName}, ${lastName}, manager_id, role_id)`);

    console.table(results);
}

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
            if (selectToDo == 'view all departments') {
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
                addToRoles().then(mainLoop);

            }

            else if (selectToDo == "add an employee") {
                addToEmployees().then(mainLoop);

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


mainLoop();

