SELECT * FROM departments;

SELECT
employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, employees.first_name AS manager
FROM employees
JOIN roles 
ON employees.id = roles.id
JOIN departments
ON departments.id = roles.id;







SELECT id FROM employees WHERE manager_id = 1 AS employee FROM employees JOIN employees AS employee ON employees.id = employees.manager_id;