-- Monte uma query que exiba o id do ator , nome do ator e id do filme em que ele já atuou usando as tabelas actor e film_actor .
USE sakila;

SHOW COLUMNS FROM actor;
SHOW COLUMNS FROM film_actor;

SELECT
  a.first_name,
  a.last_name,
  a.actor_id
FROM
  actor AS a
JOIN
  film_actor AS f
  ON a.actor_id = f.actor_id;

-- Use o JOIN para exibir o nome , sobrenome e endereço de cada um dos funcionários do banco. Use as tabelas staff e address .
SHOW COLUMNS FROM staff;
SHOW COLUMNS FROM address;

SELECT
  s.first_name,
  s.last_name,
  a.address
FROM
  staff AS s
JOIN
  address AS a
  ON a.address_id = s.address_id;

-- Exiba o id do cliente , nome e email dos primeiros 100 clientes, ordenados pelo nome em ordem decrescente, juntamente com o id do endereço e o nome da rua onde o cliente mora. Essas informações podem ser encontradas nas tabelas customer e address .
SHOW COLUMNS FROM customer;
SHOW COLUMNS FROM address;

SELECT
  c.customer_id,
  CONCAT(c.first_name, ' ', c.last_name) AS 'name',
  c.email,
  c.address_id,
  REGEXP_REPLACE(a.address,'[0-9]+ ', '') AS 'address'
FROM
  customer AS c
JOIN
  address AS a
  ON c.address_id = a.address_id;

-- Exiba o nome , email , id do endereço , endereço e distrito dos clientes que moram no distrito da California e que contêm "rene" em seus nomes. As informações podem ser encontradas nas tabelas address e customer .
SELECT
  CONCAT(c.first_name, ' ', c.last_name) AS 'name',
  c.email,
  c.address_id,
  a.district
FROM
  customer AS c
JOIN
  address AS a
  ON c.address_id = a.address_id
WHERE
  a.district = 'California'
  AND CONCAT(c.first_name, ' ', c.last_name) LIKE '%rene%';

SELECT * FROM customer;
SHOW COLUMNS FROM customer;

SHOW CREATE TABLE customer;

-- Exiba o nome e a quantidade de endereços dos clientes cadastrados. Ordene seus resultados por nomes de forma decrescente. Exiba somente os clientes ativos. As informações podem ser encontradas na tabela address e customer .
SELECT
  CONCAT(c.first_name, ' ', c.last_name) AS 'name',
  CASE
    WHEN address IS NULL AND address2 IS NULL THEN 0
    WHEN address IS NOT NULL OR address2 IS NOT NULL THEN 1
    WHEN address IS NOT NULL AND address2 IS NOT NULL THEN 2
  END AS 'enderecos_cadastrados'
FROM
  customer AS c
JOIN
  address AS a
  ON c.address_id = a.address_id
WHERE
  c.active = 1
ORDER BY
  2 DESC;

-- Estranho..

-- Monte uma query que exiba o nome , sobrenome e a média de valor ( amount ) paga aos funcionários no ano de 2006. Use as tabelas payment e staff . Os resultados devem estar agrupados pelo nome e sobrenome do funcionário.
SHOW COLUMNS FROM payment;

SELECT
  s.first_name,
  s.last_name,
  AVG(p.amount) AS 'Média de Comissão'
FROM
  staff AS s
JOIN
  payment AS p
  ON s.staff_id = p.staff_id
GROUP BY
  s.first_name,
  s.last_name;

-- Monte uma query que exiba o id do ator , nome , id do filme e título do filme , usando as tabelas actor , film_actor e film . Dica: você precisará fazer mais de um JOIN na mesma query .
SHOW COLUMNS FROM actor;
SHOW COLUMNS FROM film_actor;
SHOW COLUMNS FROM film;

SELECT
  a.actor_id,
  CONCAT(a.first_name, ' ', a.last_name) AS 'actor',
  f.film_id,
  f.title
FROM
  actor AS a
JOIN
  film_actor AS fa
  ON a.actor_id = fa.actor_id
JOIN
  film AS f
  ON fa.film_id = f.film_id
ORDER BY
  f.title ASC;
