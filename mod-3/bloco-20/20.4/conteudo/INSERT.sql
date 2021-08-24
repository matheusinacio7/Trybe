
-- Insira um novo funcionário na tabela sakila.staff .
USE sakila;

SHOW COLUMNS FROM staff;

SELECT * FROM staff LIMIT 1;

INSERT INTO
  staff (first_name, last_name, address_id, email, store_id, username, password)
  VALUES ('John', 'Doe', 3, 'john@doe.com', 2, 'johndoe', '123456');

SELECT *
  FROM staff
  
  WHERE
    first_name = 'John';

-- Para saber quais campos são obrigatórios, clique com o botão direito na tabela sakila.staff e selecione "Table Inspector". Clique na aba "columns" e verifique quais campos aceitam nulos para te guiar. Lembre-se de que valores que são gerados automaticamente não precisam ser inseridos manualmente. Boa explorada!

-- Feito o exercício anterior, vamos agora para o nível 2. Insira dois funcionários novos em apenas uma query .
INSERT INTO
  staff (first_name, last_name, address_id, email, store_id, username, password)
  VALUES
    ('Jane', 'Doe', 3, 'jane@doe.com', 2, 'janedoe', '123456'),
    ('Mary', 'Smith', 4, 'mary@smith.com', 1, 'marysmith', '123456');

SELECT
  *
  FROM staff

  ORDER BY
    staff_id;


-- Selecione os cinco primeiros nomes e sobrenomes da tabela sakila.customer e cadastre essas pessoas como atores na tabela sakila.actor .
SHOW COLUMNS FROM actor;
SHOW COLUMNS FROM customer;

INSERT INTO
  actor (first_name, last_name)

  SELECT
    first_name,
    last_name
    FROM customer

    LIMIT 5;
  
SELECT * FROM customer;
SELECT * FROM actor;

-- Cadastre três categorias de uma vez só na tabela sakila.category .
SHOW COLUMNS FROM category;
SELECT * FROM category;

INSERT INTO
  category (name)

  VALUES
    ('Terror'),
    ('Time-Travel'),
    ('Western');

-- Cadastre uma nova loja na tabela sakila.store .
SHOW COLUMNS FROM store;
SELECT * FROM store;

SELECT * FROM staff;

INSERT INTO
  store (manager_staff_id, address_id)

  VALUES
    (5, 1);
