USE trybe_hotel;
-- Usando o EXISTS na tabela books_lent e books , exiba o id e título dos livros que ainda não foram emprestados.
SHOW TABLES;

SHOW COLUMNS FROM Books;
SHOW COLUMNS FROM Books_Lent;

SELECT
  Id,
  Title
FROM
  Books AS b
WHERE NOT EXISTS (
  SELECT * FROM Books_Lent AS bl
  WHERE b.Id = bl.book_id
);

-- Usando o EXISTS na tabela books_lent e books , exiba o id e título dos livros estão atualmente emprestados e que contêm a palavra "lost" no título.
SELECT
  Id,
  Title
FROM
  Books AS b
WHERE EXISTS (
  SELECT
    *
  FROM
    Books_Lent AS bl
  WHERE
    b.Id = bl.book_id AND
    rental_return_date IS NULL
) AND
  Title LIKE "%lost%";

-- Usando a tabela carsales e customers , exiba apenas o nome dos clientes que ainda não compraram um carro.
SHOW COLUMNS FROM CarSales;
SHOW COLUMNS FROM Customers;

SELECT
  Name
FROM
  Customers AS c
WHERE NOT EXISTS (
  SELECT
    *
  FROM
    CarSales AS cs
  WHERE
    c.CustomerId = cs.CustomerId
);

-- Usando o comando EXISTS em conjunto com JOIN e as tabelas cars , customers e carsales , exiba o nome do cliente e o modelo do carro de todos os clientes que fizeram compras de carros.

SHOW COLUMNS FROM Cars;

SELECT
  cust.Name AS 'Cliente',
  car.Name AS 'Modelo do Carro'
FROM
  Customers AS cust
    JOIN
  Cars AS car
WHERE EXISTS (
  SELECT
    cs.CarId
  FROM
    CarSales as cs
  WHERE
    cust.CustomerId = cs.CustomerId AND
    car.Id = cs.CarId
);
