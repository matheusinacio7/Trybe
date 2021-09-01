DROP DATABASE IF EXISTS trybe_zoo;

CREATE DATABASE trybe_zoo;

USE trybe_zoo;

CREATE TABLE job(
  job_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary INT NOT NULL
) ENGINE=InnoDb;

CREATE TABLE locale(
  locale_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
) ENGINE=InnoDb;

CREATE TABLE animal(
  animal_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  species VARCHAR(50) NOT NULL,
  sex CHAR(1) NOT NULL CHECK (sex IN ('m', 'f')),
  age SMALLINT NOT NULL,
  locale_id INT NOT NULL,

  FOREIGN KEY (locale_id) REFERENCES locale (locale_id)
) ENGINE=InnoDb;

CREATE TABLE employee(
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  manager_id INT NOT NULL,
  job_id INT NOT NULL

  FOREIGN KEY (manager_id) REFERENCES employee (employee_id),
  FOREIGN KEY (job_id) REFERENCES job (job_id)
) ENGINE=InnoDb;

CREATE TABLE animal_employee(
  animal_id INT NOT NULL,
  employee_id INT NOT NULL,

  CONSTRAINT PRIMARY KEY (animal_id, employee_id),

  FOREIGN KEY (animal_id) REFERENCES animal (animal_id),
  FOREIGN KEY (employee_id) REFERENCES employee (employee_id)
) ENGINE=InnoDb;
