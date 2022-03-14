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

db.connect(function (err) {
    if (err) {
        return console.error('error:' + err.message);
    }
});

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
                addToRoles().then(mainLoop);

            }

            else if (selectToDo == "add an employee") {
                addToEmployees();

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
        console.table(results);
    });

}

const viewAllRoles = () => {
    db.query('SELECT roles.title, departments.department_name, roles.salary,  roles.id AS role_id FROM roles JOIN departments ON departments.id = roles.id;', function (err, results) {
        console.table(results);
    });

}

const viewAllEmployees = () => {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, employees.first_name AS manager FROM employees JOIN roles ON employees.id = roles.id JOIN departments ON departments.id = roles.id;', function (err, results) {
        console.table(results);
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

            db.query(`INSERT INTO departments (id, ${newDepartment})`, function (err, results) {
                console.table(results);
            });


        });
};

const addToRoles = () => {

    inquirer.prompt([
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


        //TODO test this query
        //TODO this should add the department_id when they enter the department name
        .then(({ newRole, newSalary, dept }) => {

            db.query(`INSERT INTO roles (id, ${newRole}, ${newSalary}, ${dept})`, function (err, results) {
                console.table(results);
            });


        });
};

const addToEmployees = () => {

    inquirer.prompt([
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
            message: 'What is this employee\'s role?',
            choices: ['Office Manager', 'Assistant Office Manger', 'Salesman', 'Receptionist', 'Technician', 'Lead Technician', 'Accountant', 'quit'],
            name: 'dept',

        },
        {
            type: 'input',
            message: 'What is this employee\'s manager?',
            name: 'newDept',
        }
    ])
        //TODO test this query
        //TODO this should add the role_id when they enter the role title. 
        //Also this should add the manager_id when they enter the manager name
        .then(({ firstName, newSalary, newDept }) => {

            db.query(`INSERT INTO employees (id, ${firstName}, ${lastName}, manager_id, role_id)`, function (err, results) {
                console.table(results);
            });


        });
};


//TODO write this function. User can update an employee role then they select an employee to update and their new role and this information is updated in the database by id
const updateEmployeeRole = () => {

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

        .then(({ firstName, newSalary, newDept }) => {

            db.query(`INSERT INTO employees (id, ${firstName}, ${lastName}, manager_id, role_id)`, function (err, results) {
                console.log(results);
            });


        });
};



mainLoop();