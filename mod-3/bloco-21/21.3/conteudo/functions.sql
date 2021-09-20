-- Agora você vai desenvolver algumas functions

-- Utilizando a tabela sakila.payment , monte uma function que retorna a quantidade total de pagamentos feitos até o momento por um determinado customer_id .
USE sakila;

SHOW COLUMNS FROM payment;

SELECT
  customer_id,
  COUNT(customer_id) AS 'payment_count'
FROM
  payment
WHERE
  customer_id = 3;

USE sakila;

DELIMITER $$

CREATE FUNCTION get_payment_count_by_id(id INT)
RETURNS INT READS SQL DATA
BEGIN
  DECLARE payment_count INT;

  SELECT
    COUNT(customer_id)
  FROM
    sakila.payment
  WHERE
    customer_id = id
  INTO payment_count;

  RETURN payment_count;
END $$

DELIMITER ;

-- Crie uma function que, dado o parâmetro de entrada inventory_id , retorna o nome do filme vinculado ao registro de inventário com esse id.
SHOW TABLES;

SHOW COLUMNS FROM inventory;

SHOW COLUMNS FROM film;

SELECT * FROM inventory;

SELECT
  title
FROM
  inventory
INNER JOIN
  film
  ON inventory.film_id = film.film_id
WHERE
  inventory_id = 4;

USE sakila;

DELIMITER $$ 

CREATE FUNCTION get_title_by_inventory_id(id INT)
RETURNS VARCHAR(128) READS SQL DATA
BEGIN
  DECLARE film_title VARCHAR(128);
  SELECT
    title
  FROM
    inventory
  INNER JOIN
    film
    ON inventory.film_id = film.film_id
  WHERE
    inventory_id = id
  INTO film_title;

  RETURN film_title;
END $$

DELIMITER ;

-- Crie uma function que receba uma determinada categoria de filme em formato de texto (ex: 'Action' , 'Horror' ) e retorna a quantidade total de filmes registrados nessa categoria.

SHOW COLUMNS FROM film_category;

SHOW COLUMNS FROM category; -- VARCHAR(25)

SELECT
  COUNT(fc.category_id) AS 'count'
FROM
  film_category AS fc
  INNER JOIN
    category AS c
  ON  fc.category_id = c.category_id
WHERE
  c.name = 'Action'
GROUP BY
  c.category_id;

USE sakila;

DELIMITER $$

CREATE FUNCTION get_film_count_by_category_name(category_name VARCHAR(25))
RETURNS INT READS SQL DATA

BEGIN
  DECLARE film_count INT;
  SELECT
    COUNT(fc.category_id) INTO film_count
  FROM
    film_category AS fc
    INNER JOIN
      category AS c
    ON  fc.category_id = c.category_id
  WHERE
    c.name = category_name
  GROUP BY
    c.category_id;
  RETURN film_count;
END $$

DELIMITER ;
