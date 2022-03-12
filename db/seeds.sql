INSERT INTO departments (department_name)
VALUES ("Office Staff"),
       ("Sales"),
       ("Field Technicial Support"),
       ("Accounting")
      

INSERT INTO roles (title, salary, department_id)
VALUES ("Office Manager", 85,000, 1),
       ("Assistant Office Manger", 65,000, 1),
       ("Salesman", 100,000, 2),
       ("Receptionist", 35,000, 1),
       ("Technician", 55,000, 3),
       ("Technician", 55,000, 3),
       ("Lead Technician", 65,000, 3),
       ("Billing", 50,000, 4)

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("George", "Smith", 10, null),
       ("Rajesh", "Shah", 20, 150),
       ("Susan", "Ellison", 30, 150),
       ("David", "Emerson", 40, 150),
       ("Jennifer", "Day", 50, 175),
       ("Terri", "Adel", 50, 175),
       ("Tom", "Walk", 60, null),
        ("Sarah", "Bell", 70, 150)


