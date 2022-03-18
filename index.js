const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

// loop for getting employee names
async function getEmployeesList() {
    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT * FROM employees;');
    let employeeNames = [];
    // loop
    results[0].forEach(obj => {
        let name = obj.first_name + " " + obj.last_name;

        employeeNames.push(name);

    })
    return (employeeNames);
}

// loop for getting role
async function getRoleList() {
    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT * FROM roles;');
    let roleList = [];
    // loop
    results[0].forEach(obj => {
        let role = obj.title;

        roleList.push(role);

    })
    return (roleList);
}

// loop for getting departments
async function getDepartmentList() {
    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    // query database
    let results = await connection.query('SELECT * FROM departments;');
    let departmentList = [];
    // loop
    results[0].forEach(obj => {
        let department = obj.department_name;

        departmentList.push(department);

    })
    return (departmentList);
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
            choices: await getDepartmentList(),
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
            choices: await getRoleList(),
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
    let firstQuery = await connection.query(`SELECT id FROM employees WHERE first_name = ? AND last_name = ?;`, [first_name, last_name]);
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
            choices: await getRoleList(),
            name: 'role',

        }

    ])

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


// function for updating employee's manager
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

    const { employee, manager } = answers;
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

    let manager_pieces = manager.split(' ');
    let firstName = manager_pieces[0];
    let lastName = manager_pieces[1];

    // query database
    let secondQuery = await connection.query(`SELECT id FROM employees WHERE first_name = ?;`, [firstName]);
    let managerID = secondQuery[0][0].id;

    let results = await connection.query(`UPDATE employees SET manager_id = ? WHERE id = ?;`, [managerID, employeeID]);
}

// function to employee by manager
async function viewByManager() {
    let answers = await inquirer.prompt([

        {
            type: 'list',
            message: 'Select a manager\'s name to view employee\'s by their manager',
            choices: await getEmployeesList(),
            name: 'manager',

        }
    ])

    const { manager } = answers;

    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    let name_pieces = manager.split(' ');

    let first_name = name_pieces[0];
    let last_name = name_pieces[1];

    // query database
    let firstQuery = await connection.query(`SELECT id FROM employees WHERE first_name = ? AND last_name = ?;`, [first_name, last_name]);
    let managerID = firstQuery[0][0].id;
    let secondQuery = await connection.query(`SELECT first_name, last_name FROM employees WHERE manager_id = ?;`, [managerID]);
    let employee = secondQuery;

    let employeeNames = [];
    if (employee[0].length == 0) {
        console.log('sorry that is not a manager');
    } else {
        // loop
        employee[0].forEach(obj => {
            let name = obj.first_name + " " + obj.last_name;

            employeeNames.push(name);

        })
        console.table(employeeNames);
    }
}

//TODO finish query
// function to view employee by department
async function viewByDepartment() {
    let answers = await inquirer.prompt([

        {
            type: 'list',
            message: 'Select a department\'s name to view employee\'s by their department',
            choices: await getDepartmentList(),
            name: 'department',

        }
    ])

    const { department } = answers;

    // create connection
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });
    ;

    // query database
    let firstQuery = await connection.query(`SELECT id FROM departments WHERE department_name = ?;`, [department]);
    let departmentID = firstQuery[0][0].id;
    let secondQuery = await connection.query(`SELECT employees.id, employees.first_name, employees.last_name FROM employees JOIN roles ON roles.id = employees.id WHERE department_id = ?;`, [departmentID]);
    let employees = secondQuery[0];
    console.table(employees);

}


// function for deleting roles
async function deleteRole() {
    let answers = await inquirer.prompt([
        {
            type: 'list',
            message: 'which role would you like to delete?',
            choices: await getRoleList(),
            name: 'role',

        }

    ])

    const { role } = answers;
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });

    // query database
    let firstQuery = await connection.query(`SELECT id FROM roles WHERE title = ?;`, [role]);
    let roleID = firstQuery[0][0].id;
    // query database
    let secondQuery = await connection.query(`DELETE FROM roles WHERE id = ?;`, [roleID]);
    console.log("selectd role has been deleted");

}

// function deletes department
async function deleteDepartment() {
    let answers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which department would you like to delete?',
            choices: await getDepartmentList(),
            name: 'department',

        }

    ])

    const { department } = answers;
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });

    // query database
    let firstQuery = await connection.query(`SELECT id FROM departments WHERE department_name = ?;`, [department]);
    let departmentID = firstQuery[0][0].id;
    // query database
    let secondQuery = await connection.query(`DELETE FROM departments WHERE id = ?;`, [departmentID]);
    console.log("selected department has been deleted");

}

// function deletes employee
async function deleteEmployee() {
    let answers = await inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to delete?',
            choices: await getEmployeesList(),
            name: 'employee',

        }

    ])

    const { employee } = answers;
    const connection = await mysql.createConnection({
        host: 'localhost', user: 'root', password: '1234',
        database: 'department_db'
    });

    let name_pieces = employee.split(' ');

    let first_name = name_pieces[0];
    let last_name = name_pieces[1];

    // query database
    let firstQuery = await connection.query(`SELECT id FROM employees WHERE first_name = ? AND last_name = ?;`, [first_name, last_name]);
    let employeeID = firstQuery[0][0].id;
    // query database
    let secondQuery = await connection.query(`DELETE FROM employees WHERE id = ?;`, [employeeID]);
    console.log("selected employee has been deleted");

}


//the main loop that controls the flow of the whole thing.
const mainLoop = () => {


    inquirer.prompt([
        {
            type: 'list',
            message: 'What would like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'view employees by manager', 'view employees by department', 'add a department', 'add a role', 'add an employee', 'update an employee\'s role', 'update employee\'s manager', 'delete a role', 'delete a department', 'delete an employee', 'quit'],
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
            else if (selectToDo == "view employees by manager") {
                viewByManager().then(mainLoop);

            }

            else if (selectToDo == "view employees by department") {
                viewByDepartment().then(mainLoop);

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

            else if (selectToDo == "delete a role") {
                deleteRole().then(mainLoop);

            }

            else if (selectToDo == "delete a department") {
                deleteDepartment().then(mainLoop);

            }

            else if (selectToDo == "delete an employee") {
                deleteEmployee().then(mainLoop);

            }

            else if (selectToDo == "quit") {
                console.log("The End");

                return;
            }
        });
}


mainLoop();

