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
        "View all Employees",
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
        case "View all Employees":
          viewEmployees();
          break;
        case "View by Department":
          viewDepartments();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "Add employee":
          addEmployees();
          break;
        case "Add department":
          addDepartments();
          break;
        case "Add roles":
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
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const viewDepartments = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const viewRoles = () => {
  const query = "SELECT * FROM roles";
  connection.query(query, (err, res) => {
    if (err) throw err;
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
        "INSERT INTO employee SET ?",
        {
          first_name: answer.employeeName,
          last_name: answer.employeeLastName,
          roles_id: answer.employeeRoleId,
          manager_id: answer.employeeManagerId,
        },
        function (err) {
          if (err) throw err;
          console.table(answer);
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
          if (err) throw err;
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
        "INSERT INTO roles SET ?",
        {
          title: answer.newTitle,
          salary: answer.newSalary,
          department_id: answer.depId,
        },
        (err, res) => {
          if (err) throw err;
          console.table(answer);
          runSearch();
        }
      );
    });
};

const updateEmployeeRoles = () => {
  connection.query(
    "SELECT (employee.last_name, roles.title FROM employee JOIN roles ON employee.roles_id = roles.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
  inquirer
    .prompt([
      {
        name: "searchLastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "newTitle",
        type: "input",
        message: "What is the employee's new title?",
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE employee SET WHERE ?",
        {
          last_name: answer.searchLastName,
        },
        {
          roles_id: answer.newTitle,
        },
        (err, res) => {
          if (err) throw err;
          console.table(answer);
          runSearch();
        }
      );
    });
};
