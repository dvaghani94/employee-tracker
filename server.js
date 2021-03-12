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

function findQuesry ()  {
    connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles_id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
      (err, res) => {
        if (err) throw err;
        console.table(res);
      }
    );
  }

  function findAllRoles (){ 
    // starting from connection query
  }
const updateEmployeeRoles = () => {
  const searching = findQuesry();
  const choicesFind = searching.map(({id, first_name, last_name})=> ({
    name:`${first_name} ${last_name}`,
    value: id
  }));

  const {employeeId} = inquirer([{
      type: "list",
      name: "employeeId",
      message: "Which employee do you choose",
      choices: choicesFind
  }])
 

   
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
