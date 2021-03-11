const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const ctable = require("console.table");

connection.connect();

// connection.connect((err) => {
//   if (err) throw err;
runSearch();
// });

function runSearch() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all Employess",
        "View by Department",
        "View all Roles",
        "Add employee",
        "Add department",
        "Add roles",
        "Update employee roles",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all Employess":
          viewEmployees();
          break;
        case "View by Department":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add employee":
          addEmployees();
          break;
        case "Add department":
          addDepartments();
          break;
        case "Add role":
          addRoles();
          break;
        case "Update employee roles":
          updateEmployeeRoles();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

const viewEmployees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    // if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const viewDepartments = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    // if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const viewRoles = () => {
  const query = "SELECT * FROM roles";
  connection.query(query, (err, res) => {
    // if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const addEmployees = () => {
  inquirer
    .prompt([
      {
        name: "employeeName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "employeeLastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "employeeRoleId",
        type: "input",
        message: "What is the employee's role id?",
      },
      {
        name: "employeeManagerId",
        type: "input",
        message: "What is the employee's manager id?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES(?)",
        [
          answer.employeeName,
          answer.employeeLastName,
          answer.employeeRoleId,
          answer.employeeManagerId,
        ],
        (err, res) => {
          console.table(answer);
          // if (err) throw err;
          runSearch();
        }
      );
    });
};

const addDepartments = () => {
  inquirer
    .prompt({
      name: "addinddepartment",
      type: "input",
      message: "What is the name of the new Department?",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        answer.addinddepartment,
        (err, res) => {
          console.table(answer);
          // if (err) throw err;
          runSearch();
        }
      );
    });
};

const addRoles = () => {
  inquirer
    .prompt([
      {
        name: "newTitle",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "newSalary",
        type: "input",
        message: "What is the salary of the new role?",
      },
      {
        name: "depId",
        type: "input",
        message: "What is the department id of the new role?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES(?) ",
        [answer.newTitle, answer.newSalary, answer.depId],
        (err, res) => {
          console.table(answer);
          // if (err) throw err;
          runSearch();
        }
      );
    });
};

const updateEmployeeRoles = () => {
  connection.query("SELECT (last_name) FROM employee", (err, res) => {
    // if (err) throw err;
    console.table(res);
  });
  inquirer
    .prompt([
      {
        name: "updateEmployee",
        type: "input",
        message: "Which employee role would you like to update?",
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE employee SET WHERE roles_id = answer.updatedEmployee",
        (err, res) => {
          console.table(res);
          runSearch();
        }
      );
    });
};
