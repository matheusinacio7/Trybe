-- Boilerplate

CREATE DATABASE `trybe_20-2_escola`;
USE `trybe_20-2_escola`;
CREATE TABLE IF NOT EXISTS Alunos (
    `Nome` VARCHAR(7) CHARACTER SET utf8,
    `Idade` INT
);
INSERT INTO Alunos VALUES
    ('Rafael', 25),
    ('Amanda', 30),
    ('Roberto', 45),
    ('Carol', 19),
    ('Amanda', 25);

-- Exercise

USE `trybe_20-2_escola`;
SELECT * FROM Alunos;

SELECT * FROM Alunos WHERE Idade < 20;

SELECT DISTINCT Idade FROM Alunos;
