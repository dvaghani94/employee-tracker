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
VALUES ("Joe", "Han", 3, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Thomas", 2, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Queen", 1, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Julie", "Robbinson", 9, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Reed", "Turner", 6, 8);


INSERT INTO role (title, salary, department_id)
VALUES ("Sales", "$40,000", 34);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineering", "$80,000", 12);

INSERT INTO role (title, salary, department_id)
VALUES ("Finance", "$100,000", 26);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal", "$150,000", 31);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;