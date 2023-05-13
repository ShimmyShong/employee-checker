INSERT INTO departments(name)
VALUES
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES
("Sales Lead", 23123, 4),
("Salesperson", 231, 4),
("Lead Engineer", 231133, 1),
("Software Engineer", 4123, 1),
("Account Manager", 43123, 2),
("Accountant", 12442, 2),
("Legal Team Lead", 231223133, 3),
("Lawyer", 243, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Doe', 2, 1),
('Bob', 'Smith', 2, 1),
('Alice', 'Johnson', 3, 2),
('Mike', 'Brown', 3, 2);