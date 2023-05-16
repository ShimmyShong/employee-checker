class Queries {
    constructor(db, roleID) {
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
    }


}


const mysql = require('mysql2');

let roleID = 0;

const initConnection = async () => {
    try {
        const db = await mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'nicetry',
                database: 'employee_db'
            },
            console.log('Connected to the courses_db database.')
        )
    } catch (err) {
        console.error(err)
    }
}


const selectAllEmployees = () => {
    db.query(
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

const selectAllDepartments = () => {
    db.query('SELECT * FROM departments', (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(rows);
    });
};

const selectAllRoles = () => {
    db.query(`
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

const addDepartment = (departmentName) => {
    db.query(`
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

const addRole = (roleName, yearlySalary, departmentID) => {
    db.query(`
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

    )
}

const addEmployee = (firstName, lastName, roleName) => {
    db.query(`
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
            )
        })
}

const updateEmployee = (employeeName, roleName) => {
    db.query(`
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
            )
        })
}
selectAllDepartments();
selectAllRoles();
selectAllEmployees();

module.exports = {
    initConnection,
    selectAllEmployees,
    selectAllDepartments,
    selectAllRoles,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployee
}