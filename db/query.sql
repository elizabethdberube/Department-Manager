SELECT * FROM departments;

SELECT 
roles.title AS titles, roles.id AS roles departments.department_name AS Department, roles.salary As Salaries
FROM roles
JOIN departments ON roles.title = departments.id;

SELECT
employees.id AS employee, employees.first_name AS First Name, employees.last_name AS Last Name, roles.title AS Title, departments.department_name AS Department, roles.salary As Salaries, employees.first_name AS Manager
FROM employees
JOIN roles 
ON employees.id = roles.id
JOIN departments
ON departments.id = roles.id;



