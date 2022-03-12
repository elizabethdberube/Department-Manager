const roles = require('express').Router();

const db = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: '1234',
    database: 'department_db'
},
    console.log('Connected to database.')
);

// create 
app.post('api/new-role', ({ body }, res) => {
    const sql = `INSERT INTO roles (title) VALUES (?)`;
    const params = [body.title];

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
app.get('/api/role', (req, res) => {
    const sql = `SELECT id, title AS title FROM roles`;

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
app.delete('/api/role/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
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
app.put('/api/role/:id', (req, res) => {
    const sql = `UPDATE roles SET role = ? Where id = ?`;
    const params = [req.body.role, req.params.id];

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


//add routes for the rest of the table

module.exports = roles;