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

            else if (selectToDo == "add a department") {
                ();

            }
            else if (selectToDo == "add a role") {
                ().then(mainLoop);


            }

            else if (selectToDo == "add an employee") {
                ();

            }
            else if (selectToDo == "update an employee role") {
                o().then(mainLoop);


            }

            else if (selectToDo == "quit") {
                e();

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
    db.query('SELECT * FROM roles', function (err, results) {
        console.log(results);
    });

}
