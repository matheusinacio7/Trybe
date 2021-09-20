-- 1
SELECT 'This is SQL Exercise, Practice and Solution';

-- 2
SELECT 1 AS n1, 2 AS n2, 3 AS n3;

-- 3
SELECT 10 + 15;

-- 4
SELECT 98 - 56;

USE trybe_scientists;

-- 5
SELECT * FROM Scientists;

-- 6
SELECT Name as "Nome do Projeto", Hours AS "Tempo de Trabalho" FROM Projects;

-- 7
SELECT * FROM Scientists
ORDER BY Name;

-- 8
SELECT * FROM Projects
ORDER BY Name DESC;

-- 9
SELECT CONCAT('O projeto ', Name, ' precisou de ', Hours, ' horas para ser concluído') AS 'Descrição de Duração' FROM Projects;

-- 10
SELECT Name, Hours FROM Projects
ORDER BY Hours Desc
LIMIT 3;

-- 11
SELECT DISTINCT * FROM AssignedTo;

-- 12
SELECT Name FROM Projects
ORDER BY Hours Desc
LIMIT 1;

-- 13
SELECT Name FROM Projects
ORDER BY Hours
LIMIT 1
OFFSET 1;

-- 14
SELECT * FROM Projects
ORDER BY Hours
LIMIT 5;

-- 15
SELECT CONCAT('Existem ', COUNT(*), ' cientistas na tabela Scientists') FROM Scientists;
