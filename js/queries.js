const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'nicetry',
        database: 'employee_db'
    },
    console.log('Connected to the courses_db database.')
)

const selectAllEmployees = () => {
    db.query('SELECT * FROM employees', (err, rows) => {
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
    db.query('SELECT * FROM roles', (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(rows);
    });
};

const addDepartment = (departmentName) => {
    db.query(`
    INSERT INTO departments (id, name)
    VALUES ("${departmentName}")
    `,
        (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Department Added!")
        });
};

selectAllDepartments();
addDepartment("New Department")
selectAllDepartments();