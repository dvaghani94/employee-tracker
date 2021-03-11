DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary INT UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_id (department_id),
    FOREIGN KEY (department_id) REFERENCES department(id)
    -- foreign key references cascade  
);

CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT UNSIGNED NOT NULL,
    INDEX roles_id (roles_id),
    FOREIGN KEY (roles_id) REFERENCES roles(id),
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


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales-Person", 40000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 80000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 100000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 150000, 4);


INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Joe", "Han", 4, NULL);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Sarah", "Thomas", 2, NULL);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("John", "Queen", 1, 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Julie", "Robbinson", 3, 1);



SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;
