INSERT INTO departments (department_name)
VALUES ("Office Staff"),
       ("Sales"),
       ("Field Technicial Support"),
       ("Accounting");
      

INSERT INTO roles (title, salary, department_id)
VALUES ("Office Manager", 85000.00, 1),
       ("Assistant Office Manger", 65000.00, 1),
       ("Salesman", 90000.00, 2),
       ("Receptionist", 35000.00, 1),
       ("Technician", 55000.00, 3),
       ("Technician", 55000.00, 3),
       ("Lead Technician", 65000.00, 3),
       ("Billing", 50000.00, 4);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES ("George", "Smith", null),
       ("Rajesh", "Shah", "George Smith"),
       ("Susan", "Ellison", "George Smith"),
       ("David", "Emerson", "George Smith"),
       ("Jennifer", "Day", "Tom Walk",
       ("Terri", "Adel", "Tom Walk"),
       ("Tom", "Walk", null),
        ("Sarah", "Bell", );


