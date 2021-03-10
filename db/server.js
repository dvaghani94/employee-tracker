const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./db/connection")

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

function runSearch = () => {
    inquirer
      .prompt(
        {
          type: "list",
          name: "userChoice",
          message: "What would you like to do?",
          choices: [
            "View all Employess",
            "View by Department",
            "View all employees by Manager",
            "Add employee",
            "Add role",
            "Add manager",
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
            case "Add role":
            addRoles();
            break;
            case "Add manager":
            addManagers();
            break;
        }
      });
  }
  
  const viewEmployees = () => {
    const query =
      'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id';
    connection.query(query, (err, res) => {
      res.forEach(({ artist }) => console.log(artist));
      runSearch();
    });
  };
  
  const rangeSearch = () => {
    inquirer
      .prompt([
        {
          name: 'start',
          type: 'input',
          message: 'Enter starting position: ',
          validate(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
        {
          name: 'end',
          type: 'input',
          message: 'Enter ending position: ',
          validate(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
      ])
      .then((answer) => {
        const query =
          'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
        connection.query(query, [answer.start, answer.end], (err, res) => {
          res.forEach(({ position, song, artist, year }) => {
            console.log(
              `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
            );
          });
          runSearch();
        });
      });
  };
  
  const songSearch = () => {
    inquirer
      .prompt({
        name: 'song',
        type: 'input',
        message: 'What song would you like to look for?',
      })
      .then((answer) => {
        console.log(answer.song);
        connection.query(
          'SELECT * FROM top5000 WHERE ?',
          { song: answer.song },
          (err, res) => {
            if (res[0]) {
              console.log(
                `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
              );
            } else {
              console.error(`No results for ${answer.song}`);
            }
            runSearch();
          }
        );
      });
  };
  
  const songAndAlbumSearch = () => {
    inquirer
      .prompt({
        name: 'artist',
        type: 'input',
        message: 'What artist would you like to search for?',
      })
      .then((answer) => {
        let query =
          'SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ';
        query +=
          'FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ';
        query +=
          '= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position';
  
        connection.query(query, [answer.artist, answer.artist], (err, res) => {
          console.log(`${res.length} matches found!`);
          res.forEach(({ year, position, artist, song, album }, i) => {
            const num = i + 1;
            console.log(
              `${num} Year: ${year} Position: ${position} || Artist: ${artist} || Song: ${song} || Album: ${album}`
            );
          });
  
          runSearch();
        });
      });
  };