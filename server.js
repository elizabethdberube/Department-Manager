const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//so express can handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));