const inquirer = require('inquirer');
const sql = require('mysql2');

questionObj = {
    initQuestion:
    {
        name: 'questionInit',
        message: 'What would you like to do?',
        type: 'list',
        choices: ['View All Employees', 'Add Employee', 'Update Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
    addDepartmentChoose: {
        name: 'questionAddDepartment',
        message: 'What is the name of the repartment?',
        type: 'input'
    },
    addRoleChoose: [
        {
            name: 'questionAddRole',
            message: 'What is the name of the role?',
            type: 'input'
        },
        {
            name: 'questionAddRoleSalary',
            message: 'What is the yearly salary of the role?',
            type: 'input'
        },
        {
            name: 'questionAddRoleDepartment',
            message: 'Which department does the role belong to?',
            type: 'list',
            choices: departmentArray // TODO: Add this array later
        },
    ],
    addEmployeeChoose: [
        {
            name: 'questionAddEmployeeFirstName',
            message: "What is the employee's first name?",
            type: 'input'
        },
        {
            name: 'questionAddEmployeeLastName',
            message: "What is the employee's last name?",
            type: 'input'
        },
        {
            name: 'questionAddEmployeeRole',
            message: "What is the employee's role?",
            type: 'list',
            choices: roleArray //TODO: Add this array later
        },
        {
            name: 'questionAddEmployeeManager',
            message: "What is the employee's manager?",
            type: 'list',
            choices: managerArray //TODO: Add this array later
        },
    ],
    updateEmployeeRole: [
        {
            name: 'questionUpdateEmployee',
            message: "Which employee's role would you like to update?",
            type: 'list',
            choices: employeeArray //TODO: Add this array later
        },
        {
            name: 'questionUpdateEmployeeRole',
            message: "What is the employee's role?",
            type: 'list',
            choices: roleArray //TODO: Add this array later
        },
    ]
}

function init() {
    inquirer
        .prompt()
}