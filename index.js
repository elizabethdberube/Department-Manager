const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');


async function getEmployeesList() {
    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT * FROM employees;');
    let employeeNames = [];
    results[0].forEach(obj => {
        let name = obj.first_name + " " + obj.last_name;

        employeeNames.push(name);

    })
    return (employeeNames);
}

// function for viewing all departments
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

// function for viewing all roles
async function viewAllRoles() {

    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT roles.title, departments.department_name, roles.salary,  roles.id AS role_id FROM roles JOIN departments ON departments.id = roles.department_id;');
    console.table(results[0]);
}

// function for viewing all employees
async function viewAllEmployees() {

    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, manager.first_name AS manager FROM employees JOIN employees AS manager ON manager.id = employees.manager_id JOIN roles ON roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id;');
    console.table(results[0]);
}


// function to add deparments
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

// function to add roles
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
    let results = await connection.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);`, [newRole, newSalary, deptID]);

}

// function to add employees
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
            choices: await getEmployeesList(),
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
    let results = await connection.query(`INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?);`, [firstName, lastName, managerID, roleID]);

}


// function for updating employees
async function updateEmployeeRole() {
    let answers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee\'s role would you like to update?',
            choices: await getEmployeesList(),
            name: 'employee',

        },
        {
            type: 'list',
            message: 'What is this new employee\'s role?',
            choices: ['Office Manager', 'Assistant Office Manger', 'Salesman', 'Receptionist', 'Technician', 'Lead Technician', 'Accountant', 'quit'],
            name: 'role',

        }

    ])
    //TODO fix this query
    const { employee, role } = answers;
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });

    let name_pieces = employee.split(' ');
    let first_name = name_pieces[0];
    let last_name = name_pieces[1];

    // query database
    let firstQuery = await connection.query(`SELECT id FROM employees WHERE first_name = ? AND last_name = ? ;`, [first_name, last_name]);
    let employeeID = firstQuery[0][0].id;

    // query database
    let secondQuery = await connection.query(`SELECT id FROM roles WHERE title = ?;`, [role]);
    let roleID = secondQuery[0][0].id;

    let results = await connection.query(`UPDATE employees SET role_id = ? WHERE id = ?;`, [roleID, employeeID]);

}

// function for updating employee's
async function updateEmployeesManager() {
    let answers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee\'s manager would you like to update?',
            choices: await getEmployeesList(),
            name: 'employee',

        },
        {
            type: 'list',
            message: 'What is this employee\'s new manager?',
            choices: await getEmployeesList(),
            name: 'manager',

        }

    ])

    //TODO fix this query
    const { employee, manager } = answers;
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });

    let name_pieces = employee.split(' ');
    let first_name = name_pieces[0];
    let last_name = name_pieces[1];

    // query database
    let firstQuery = await connection.query(`SELECT id FROM employees WHERE first_name = ?;`, [first_name]);
    let employeeID = firstQuery[0][0].id;

    let manager_pieces = manager.split(' ');
    let firstName = manager_pieces[0];
    let lastName = manager_pieces[1];

    // query database
    let secondQuery = await connection.query(`SELECT id FROM employees WHERE first_name = ?;`, [firstName]);
    let managerID = secondQuery[0][0].id;

    let results = await connection.query(`UPDATE employees SET manager_id = ? WHERE id = ?;`, [managerID, employeeID]);
}

//the main loop that controls the flow of the whole thing.
const mainLoop = () => {


    inquirer.prompt([
        {
            type: 'list',
            message: 'What would like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'view employees by manager', 'add a department', 'add a role', 'add an employee', 'update an employee\'s role', 'update employee\'s manager', 'quit'],
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

            else if (selectToDo == "update an employee\'s role") {
                updateEmployeeRole().then(mainLoop);

            }

            else if (selectToDo == "update employee\'s manager") {
                updateEmployeesManager().then(mainLoop);

            }

            else if (selectToDo == "quit") {
                console.log("The End");

                return;
            }
        });
}


mainLoop();

