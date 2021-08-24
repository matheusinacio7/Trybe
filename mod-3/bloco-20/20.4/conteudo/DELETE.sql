USE sakila;

-- Exclua do banco de dados o ator com o nome de "KARL".
SHOW COLUMNS FROM actor;

DELETE FROM film_actor
  WHERE actor_id = (
    SELECT actor_id
    FROM actor
    WHERE first_name = 'KARL'
  );

DELETE FROM actor
  WHERE first_name = 'KARL';

-- Exclua do banco de dados os atores com o nome de "MATTHEW".
DELETE FROM film_actor
  WHERE actor_id IN (
    SELECT actor_id
    FROM actor
    WHERE first_name = 'MATTHEW'
  );

DELETE FROM actor
  WHERE first_name = 'MATTHEW';

-- Exclua da tabela film_text todos os registros que possuem a palavra "saga" em suas descrições.
SELECT * FROM film_text;

DELETE FROM film_text
  WHERE description LIKE '%saga%';


-- Apague da maneira mais performática possível todos os registros das tabelas film_actor e film_category .
TRUNCATE TABLE film_actor;
TRUNCATE TABLE film_category;

-- Inspecione todas as tabelas do banco de dados sakila e analise quais restrições ON DELETE foram impostas em cada uma. Use o Table Inspector para fazer isso (aba DDL).
SHOW CREATE TABLE film_actor;
SHOW CREATE TABLE film_category;

-- Exclua o banco de dados e o recrie (use as instruções no início desta aula).

DROP SCHEMA IF EXISTS sakila;
DROP DATABASE IF EXISTS sakila;
