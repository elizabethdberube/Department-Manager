SELECT * FROM departments;

SELECT 
roles.title AS titles, roles.id AS roles-ID, departments.department_name AS Department, roles.salary As Salaries
FROM roles
JOIN departments ON roles.title = departments.id;

SELECT
employees.id AS employee, employees.first_name AS First-Name, employees.last_name AS Last-Name, roles.title AS Title, departments.department_name AS Department, roles.salary As Salaries, employees.manager_id AS Manager
FROM 
