const express = require('express');
const mysql = require('mysql2');
const departmentsAPI = require('./routes/departments.js');
const rolesAPI = require('./routes/roles.js');

const PORT = 3001;
const app = express();

//so express can handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', departmentsAPI);
app.use('/api', rolesAPI);










app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log(`App listening at http://localhost:${PORT} 👍`);
});