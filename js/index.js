const inquirer = require("inquirer");
const mysql = require("mysql2");
const { Queries } = require("./queries");

let roleID = 0;
let thisQuery = new Queries();
// thisQuery.initArrays();
// this is an object that holds the questions that will be used for inquirer
questionObj = {
    initQuestion: {
        name: "questionInit",
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
        ],
    },
    addDepartmentChoose: {
        name: "questionAddDepartment",
        message: "What is the name of the department?",
        type: "input",
    },
    addRoleChoose: [
        {
            name: "questionAddRole",
            message: "What is the name of the role?",
            type: "input",
        },
        {
            name: "questionAddRoleSalary",
            message: "What is the yearly salary of the role?",
            type: "input",
        },
        {
            name: "questionAddRoleDepartment",
            message: "Which department does the role belong to?",
            type: "list",
            choices: thisQuery.departmentArray, //departmentArray // TODO: Add a departmentArray later
        },
    ],
    addEmployeeChoose: [
        {
            name: "questionAddEmployeeFirstName",
            message: "What is the employee's first name?",
            type: "input",
        },
        {
            name: "questionAddEmployeeLastName",
            message: "What is the employee's last name?",
            type: "input",
        },
        {
            name: "questionAddEmployeeRole",
            message: "What is the employee's role?",
            type: "list",
            choices: thisQuery.roleArray, //roleArray //TODO: Add a roleArray array later
        },
        {
            name: "questionAddEmployeeManager",
            message: "What is the employee's manager?",
            type: "list",
            choices: ["sa"], //managerArray //TODO: Add managerArray array later
        },
    ],
    updateEmployeeRole: [
        {
            name: "questionUpdateEmployee",
            message: "Which employee's role would you like to update?",
            type: "list",
            choices: thisQuery.employeeArray, //employeeArray //TODO: Add employeeArray array later
        },
        {
            name: "questionUpdateEmployeeRole",
            message: "What is the employee's role?",
            type: "list",
            choices: thisQuery.roleArray, //roleArray //TODO: Add roleArray later
        },
    ],
};

// object destructuring to make life easier
const { initQuestion, addDepartmentChoose } = questionObj;

const init = async () => {
    const answer = await inquirer.prompt(initQuestion);
    switch (answer.questionInit) {
        case "View All Employees":
            thisQuery.selectAllEmployees();
            init();
            break;
        case "View All Departments":
            thisQuery.selectAllDepartments();
            init();
            break;
        case "View All Roles":
            thisQuery.selectAllRoles();
            init();
            break;
        case "Add Employee":
            await thisQuery.addEmployee();
            init();
            break;
        case "Add Department":
            const addDepartmentAnswer = await inquirer.prompt(addDepartmentChoose);
            thisQuery.addDepartment(addDepartmentAnswer.questionAddDepartment);
            init();
            break;
        case "Add Role":
            await thisQuery.addRole();
            init();
            break;
        case "Update Employee":
            await thisQuery.updateEmployee();
            init();
            break;
        case "Quit":
            exit();
            break;
        default:
            console.log("Something went wrong");
    }
};

init();
