const departments = require('express').Router();

const db = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: '1234',
    database: 'department_db'
},
    console.log('Connected to database.')
);

// create 
app.post('api/new-department', ({ body }, res) => {
    const sql = `INSERT INTO departments (department_name) VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// read
app.get('/api/department', (req, res) => {
    const sql = `SELECT id, department_name AS title FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// delete
app.delete('/api/department/:id', (req, res) => {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.someRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.someRows,
                id: req.params.id
            });
        }
    });
});

// use this to join info
app.get('/api/')

// update
app.put('/api/department/:id', (req, res) => {
    const sql = `UPDATE departments SET department = ? Where id = ?`;
    const params = [req.body.department, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });

        } else if (!result.someRows) {
            res.json({
                message: 'Department not found'
            });

        } else res.json({
            message: 'success',
            data: req.body,
            changes: result.someRows
        });
    });
});

module.exports = departments;
