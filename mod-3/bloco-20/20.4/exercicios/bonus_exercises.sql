
-- Para realizar os exercícios 8 a 10, faça os exercícios anteriores (1 a 7) e utilize o banco de dados Pixar .
USE trybe_Pixar;

-- Exercício 8 : Altere a classificação da tabela BoxOffice para 9.0 de todos os filmes que lucraram mais de 400 milhões no mercado interno.

SHOW COLUMNS FROM BoxOffice;
UPDATE BoxOffice
  SET rating = 9.0

  WHERE domestic_sales > 400000000;  

-- Exercício 9 : Altere a classificação da tabela BoxOffice para 6.0 de todos os filmes que lucraram menos de 300 milhões no mercado internacional e mais de 200 milhões no mercado interno.
UPDATE BoxOffice
  SET rating = 6.0

  WHERE international_sales < 300000000
  AND domestic_sales > 200000000;

-- Exercício 10 : Exclua da tabela Movies todos os filmes com menos de 100 minutos de duração. 
SHOW COLUMNS FROM Movies;

DELETE FROM Movies
  WHERE length_minutes < 100;
