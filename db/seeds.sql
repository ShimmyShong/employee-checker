INSERT INTO departments(id, name)
VALUES
(1, "Engineering"),
(2, "Finance"),
(3, "Legal"),
(4, "Sales");

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, "Sales Lead", 23123, 4),
(2, "Salesperson", 231, 4),
(3, "Lead Engineer", 231133, 1),
(4, "Software Engineer", 4123, 1),
(5, "Account Manager", 43123, 2),
(6, "Accountant", 12442, 2),
(7, "Legal Team Lead", 231223133, 3),
(8, "Lawyer", 243, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Doe', 2, 1),
(3, 'Bob', 'Smith', 2, 1),
(4, 'Alice', 'Johnson', 3, 2),
(5, 'Mike', 'Brown', 3, 2);