const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const ctable = require("console.table");

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all Employess",
        "View by Department",
        "View all employees by Manager",
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
        case "View all employees by Manager":
          viewManagers();
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
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const viewDepartments = () => {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const viewManagers = () => {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
};

const addEmployees = () => {
  inquirer
    .prompt(
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
      }
    )
    .then((answer) => {
      connection.query(query, [answer.employeeName, answer.employeeLastName, answer.employeeRoleId, answer.employeeManagerId], (err, res) => {
          console.log(res);
          if (err) throw err;
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
      connection.query(query, [answer.addinddepartment], (err, res) => {
        console.log(res);
        if (err) throw err;
        runSearch();
      });
    });
};

const addRoles = () => {
  inquirer
    .prompt(
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
      }
    )
    .then((answer) => {
      connection.query(
        query,
        [answer.newTitle, answer.newSalary, answer.depId],
        (err, res) => {
          console.log(res);
          if (err) throw err;
          runSearch();
        }
      );
    });
};

// const updateEmployeeRoles = () => {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?",
//     })
//     .then((answer) => {
//       let query =
//         "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query +=
//         "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query +=
//         "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//       connection.query(query, [answer.artist, answer.artist], (err, res) => {
//         console.log(`${res.length} matches found!`);
//         res.forEach(({ year, position, artist, song, album }, i) => {
//           const num = i + 1;
//           console.log(
//             `${num} Year: ${year} Position: ${position} || Artist: ${artist} || Song: ${song} || Album: ${album}`
//           );
//         });

//         runSearch();
//       });
//     });
// };
