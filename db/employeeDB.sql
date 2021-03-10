DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_id (department_id),
    FOREIGN KEY (department_id) REFERENCES department(id),
    -- foreign key references cascade 

    title VARCHAR(30),
    salary INT UNSIGNED NOT NULL 
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    INDEX role_id (role_id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    -- foreign key references cascade 
    manager_id INT UNSIGNED,
    INDEX man_id (manager_id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    -- foreign key references cascade 
);

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();


INSERT INTO role (title, salary, department_id)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Legal");


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;