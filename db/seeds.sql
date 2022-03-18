INSERT INTO departments (id, department_name)
VALUES (1, "Office Staff"),
       (2, "Sales"),
       (3, "Field Technicial Support"),
       (4, "Accounting"),
       (5, "Customer Service"),
       (6, "Human Resources"),
       (7, "IT"),
       (8, "Security");
      

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Office Manager", 85000.00, 1),
       (2, "Assistant Office Manger", 65000.00, 1),
       (3, "Salesman", 90000.00, 2),
       (4, "Receptionist", 35000.00, 1),
       (5, "Technician", 55000.00, 3),
       (6, "HR", 75000.00, 1),
       (7, "Lead Technician", 65000.00, 3),
       (8, "Accountant", 50000.00, 4);

INSERT INTO employees (id, first_name, last_name, manager_id, role_id)
VALUES (1, "George", "Smith", NULL, 1),
       (2, "Rajesh", "Shah", 1, 2),
       (3, "Susan", "Ellison", 1, 3),
       (4, "David", "Emerson", 1, 4),
       (5, "Jennifer", "Day", 7, 5),
       (6, "Terri", "Adel", 7, 6),
       (7, "Tom", "Walk", NULL, 7),
       (8, "Sarah", "Bell", NULL, 8);


