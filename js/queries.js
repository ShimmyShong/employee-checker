const mysql = require('mysql2');
class Queries {
    constructor(db, roleID, departmentArray, employeeArray, roleArray) {
        this.db = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'nicetry',
                database: 'employee_db'
            },
            console.log('Connected to the courses_db database.')
        )
        this.roleID = 0;

        this.db.query(`
        SELECT * FROM departments;
        `,
            (err, res) => {
                if (err) {
                    console.error('error occured ' + err)
                    return;
                }
                this.departmentArray = res.map(department => department.name); // mapping all the names to a new array
            })

        this.db.query(`
        SELECT * FROM employees;
        `,
            (err, res) => {
                if (err) {
                    console.error('error occured ' + err)
                    return;
                }
                this.employeeArray = res.map(employees => `${employees.first_name} ${employees.last_name}`); // mapping all the names to a new array
            })

        this.db.query(`
        SELECT * FROM roles;
        `,
            (err, res) => {
                if (err) {
                    console.error('error occured ' + err)
                    return;
                }
                this.roleArray = res.map(role => role.title); // mapping all the names to a new array
            })
    }

    selectAllEmployees = () => {
        this.db.query(
            `
        SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Role', departments.name AS 'Department', roles.salary AS 'Salary'
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id;
        `, (err, rows) => {
            if (err) {
                console.error(err);
                return;
            }
            console.table(rows);
        });
    };

    selectAllDepartments = () => {
        this.db.query('SELECT * FROM departments', (err, rows) => {
            if (err) {
                console.error(err);
                return;
            }
            console.table(rows);
        });
    };

    selectAllRoles = () => {
        this.db.query(`
    SELECT roles.id, roles.title AS 'Title', departments.name AS 'Department Name', roles.salary AS 'Salary'
    FROM roles
    JOIN departments ON roles.department_id = departments.id
    ORDER BY roles.id ASC;
    `, (err, rows) => {
            if (err) {
                console.error(err);
                return;
            }
            console.table(rows);
        });
    };

    addDepartment = (departmentName) => {
        this.db.query(`
    INSERT INTO departments (name)
    VALUES ("${departmentName}")
    `,
            (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`${departmentName} Department Added!`)
            });
    };

    addRole = (roleName, yearlySalary, departmentID) => {
        this.db.query(`
    INSERT INTO roles (title, salary, department_id)
    VALUES ("${roleName}", ${yearlySalary}, ${departmentID})
    `,
            (err, res) => {
                if (err) {
                    console.error(err)
                    return;
                }
                console.log(`Role ${roleName} with a salary of ${yearlySalary} added to ${departmentID}!`)
            }
        );
    };

    addEmployee = (firstName, lastName, roleName) => {
        this.db.query(`
    SELECT id FROM roles WHERE title = ?`, roleName, // this is getting the role_id based on its name
            (err, res) => {
                if (err) {
                    console.error(err)
                    return;
                }
                roleID = res[0].id // must be res[0].id because the id is returned as an array
                console.log(roleID)
                db.query(`
            INSERT INTO employees (first_name, last_name, role_id)
            VALUES ('${firstName}', '${lastName}', ${roleID})
            `,
                    (err, res) => {
                        if (err) {
                            console.error(err)
                            return;
                        }
                        console.log(`${firstName} ${lastName} added as a ${roleName}!`)
                    }
                );
            });
    };

    updateEmployee = (employeeName, roleName) => {
        this.db.query(`
    SELECT id FROM roles WHERE title = ?`, roleName, // this is getting the role_id based on its name
            (err, res) => {
                if (err) {
                    console.error(err)
                    return;
                }
                roleID = res[0].id // must be res[0].id because the id is returned as an array
                console.log(roleID)
                db.query(`
            UPDATE employees
            SET role_id = "${roleID}"
            WHERE first_name = "${employeeName}"
            `,
                    (err, res) => {
                        if (err) {
                            console.error(err)
                            return;
                        }
                        console.log(`${employeeName}'s role updated to ${roleName}!`)
                    }
                );
            });
    };
}

const thisQuery = new Queries()

module.exports = { Queries };