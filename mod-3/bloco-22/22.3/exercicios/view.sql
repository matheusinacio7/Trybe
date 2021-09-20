--  Desafios sobre VIEW

--  Crie uma view chamada film_with_categories utilizando as tabelas category , film_category e film do banco de dados sakila . Essa view deve exibir o título do filme, o id da categoria e o nome da categoria, conforme a imagem abaixo. Os resultados devem ser ordenados pelo título do filme.

USE sakila;

SHOW COLUMNS FROM film; -- film_id, title

SHOW COLUMNS FROM category; -- category_id, name

SHOW COLUMNS FROM film_category; -- category_id, film_id

CREATE VIEW film_with_categories AS
  SELECT
    fc.category_id,
    f.title,
    c.name
  FROM
    film_category AS fc
  INNER JOIN
    film AS f
    ON f.film_id = fc.film_id
  INNER JOIN
    category AS c
    ON c.category_id = fc.category_id
  ORDER BY
    f.title ASC;

SELECT * FROM film_with_categories;


--  Crie uma view chamada film_info utilizando as tabelas actor , film_actor e film do banco de dados sakila . Sua view deve exibir o actor_id , o nome completo do ator ou da atriz em uma coluna com o ALIAS actor e o título dos filmes. Os resultados devem ser ordenados pelos nomes de atores e atrizes. Use a imagem a seguir como referência.

SHOW COLUMNS FROM actor; -- actor_id, first_name + last_name (actor)

SHOW COLUMNS FROM film; -- film_id, title

SHOW COLUMNS FROM film_actor; -- film_id, actor_id

CREATE VIEW film_info AS
  SELECT
    a.actor_id,
    CONCAT(a.first_name, ' ', a.last_name) AS 'actor',
    f.title
  FROM
    film_actor AS fc
  INNER JOIN
    film AS f
    ON f.film_id = fc.film_id
  INNER JOIN
    actor AS a
    ON a.actor_id = fc.actor_id
  ORDER BY
    2 ASC;

SELECT *  FROM film_info;

--  Crie uma view chamada address_info que faça uso das tabelas address e city do banco de dados sakila . Sua view deve exibir o address_id , o address , o district , o city_id e a city . Os resultados devem ser ordenados pelo nome das cidades. Use a imagem abaixo como referência. 

SHOW COLUMNS FROM city; -- city_id, city

SHOW COLUMNS FROM address; -- address_id, address, district, city_id

CREATE VIEW address_info AS
  SELECT
    c.city_id,
    c.city,
    a.address_id,
    a.address,
    a.district
  FROM
    city AS c
  INNER JOIN
    address AS a
    ON a.city_id = c.city_id
  ORDER BY
    c.city ASC;

SELECT * FROM address_info;

-- Crie uma view chamada movies_languages , usando as tabelas film e language do banco de dados sakila . Sua view deve exibir o título do filme , o id do idioma e o idioma do filme , como na imagem a seguir.

SHOW COLUMNS FROM film; -- film_id, title, language_id

SHOW COLUMNS FROM language; -- language_id, name

CREATE VIEW movies_languages AS
  SELECT
    f.title,
    l.language_id,
    l.name
  FROM
    film AS f
  INNER JOIN
    language AS l
    ON l.language_id = f.film_id
  ORDER BY
    f.title;

SELECT * FROM movies_languages;
