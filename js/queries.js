const mysql = require('mysql2');
const { prompt } = require('inquirer');


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
        this.departmentArray;
        this.employeeArray;
        this.roleArray;
    }

    initArrays = () => {
        console.log('initializing arrays')
        this.db.query(`
        SELECT * FROM departments;
        `,
            function (err, res) {
                if (err) {
                    console.error('error occurred ' + err)
                    return;
                }
                this.departmentArray = res.map(department => department.name) // mapping all the names to a new array
                console.log(this.departmentArray)
            })

        this.db.query(`
        SELECT * FROM employees;
        `,
            function (err, res) {
                if (err) {
                    console.error('error occurred ' + err)
                    return;
                }
                this.employeeArray = res.map(employees => `${employees.first_name} ${employees.last_name}`); // mapping all the names to a new array
            })

        this.db.query(`
        SELECT * FROM roles;
        `,
            function (err, res) {
                if (err) {
                    console.error('error occurred ' + err)
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

    addEmployee = async () => {
        try {
            const [roleData] = await this.db
                .promise().query(`SELECT id, title FROM roles`);

            const [managerData] = await this.db
                .promise().query(`SELECT id, first_name, last_name FROM employees`);

            const newEmployeeData = await prompt([
                {
                    name: 'first_name',
                    message: "What is the employee's first name?",
                    type: 'input'
                },
                {
                    name: 'last_name',
                    message: "What is the employee's last name?",
                    type: 'input'
                },
                {
                    name: 'role_id',
                    message: "What is the employee's role?",
                    type: 'list',
                    choices: roleData.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }))
                },
                {
                    name: 'manager_id',
                    message: "What is the employee's manager?",
                    type: 'list',
                    choices: managerData.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                },
            ]);

            const data = await this.db.promise()
                .query(`INSERT INTO employees SET ?`, newEmployeeData);

            console.log(`\nEmployee Added\n`);
        } catch (err) {
            console.log(err);
        }
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

// const Q = new Queries;
// Q.initArrays();

module.exports = { Queries };