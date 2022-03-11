const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3006;
const app = express();

//so express can handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: '1234',
    database: 'department_db'
},
    console.log('Connected to database.')
);

app.post('api/new-department', ({ body }, res) => {
    const sql = `INSERT INTO department (department_name) VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.join({
            message: 'success',
            data: body
        });
    });
});

app.get('/api/departments', (req, res) => {
    const sql = `SELECT id, department_name AS title FROM departments`;

})