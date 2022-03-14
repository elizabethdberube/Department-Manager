SELECT * FROM departments;

SELECT 
roles.title, departments.department_name, roles.salary,  roles.id AS role_id
FROM roles
JOIN departments ON departments.id = roles.id;

SELECT
employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, employees.first_name AS manager
FROM employees
JOIN roles 
ON employees.id = roles.id
JOIN departments
ON departments.id = roles.id;



