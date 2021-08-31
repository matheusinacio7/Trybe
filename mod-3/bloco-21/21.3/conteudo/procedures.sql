-- Para todos os desafios abaixo, certifique-se de que a função possa ser chamada e o resultado dela seja usado corretamente. Utilize o banco de dados sakila .
USE sakila;

-- Monte uma procedure que exiba os 10 atores mais populares, baseado em sua quantidade de filmes. Essa procedure não deve receber parâmetros de entrada ou saída e, quando chamada, deve exibir o id do ator ou atriz e a quantidade de filmes em que atuaram.
SHOW TABLES;
SHOW COLUMNS FROM film_actor;


SELECT * FROM film_actor ORDER BY actor_id;

SELECT
  actor_id,
  COUNT(*) AS 'film_count'
FROM
  film_actor
GROUP BY
  actor_id
ORDER BY
  COUNT(*) DESC
LIMIT 10;

DELIMITER $$

CREATE PROCEDURE GetTopTenActorsWithMostFilms()
BEGINGetTopTenActorsWithMostFilms
  SELECT
  actor_id,
  COUNT(*) AS 'film_count'
FROM
  film_actor
GROUP BY
  actor_id
ORDER BY
  COUNT(*) DESC
LIMIT 10;
END $$

DELIMITER ;

CALL GetTopTenActorsWithMostFilms();

-- Monte uma procedure que receba como parâmetro de entrada o nome da categoria desejada em uma string e que exiba o id do filme , seu titulo , o id de sua categoria e o nome da categoria selecionada. Use as tabelas film , film_category e category para montar essa procedure.

SHOW COLUMNS FROM film; -- film_id, title
SHOW COLUMNS FROM film_category; -- film_id, category_id
SHOW COLUMNS FROM category; -- category_id, name

USE sakila;
DELIMITER $$ 

CREATE PROCEDURE get_films_from_category(IN selected_category VARCHAR(300))
BEGIN
  SELECT
    f.film_id,
    f.title,
    fc.category_id,
    c.name
  FROM
    film AS f
  INNER JOIN
    film_category AS fc
    ON f.film_id = fc.film_id
  INNER JOIN
    category AS c
    ON fc.category_id = c.category_id
  WHERE
    c.name = selected_category;
END $$

DELIMITER ;

-- Monte uma procedure que receba o email de um cliente como parâmetro de entrada e diga se o cliente está ou não ativo, através de um parâmetro de saída.

SHOW TABLES;

SHOW COLUMNS FROM customer; -- varchar 50

SELECT * FROM customer;

SELECT
  IF (active, 'ACTIVE', 'INACTIVE') AS customer_status
FROM
  customer
WHERE
  email = 'MARY.SMITH@sakilacustomer.org';

USE sakila;

DELIMITER $$

CREATE PROCEDURE get_is_customer_active(
  IN customer_email VARCHAR(50),
  OUT is_active VARCHAR(9)
)
BEGIN

  SELECT
    IF (active, 'ACTIVE', 'INACTIVE') AS customer_status
  FROM
    customer
  WHERE
    email = customer_email;

END $$

DELIMITER ;
