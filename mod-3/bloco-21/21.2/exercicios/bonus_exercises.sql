USE trybe_Pixar2;
 
SHOW COLUMNS FROM Movies;

-- Exercício 10: Utilizando o INNER JOIN , selecione todas as informações dos filmes com avaliação maior que 8 e que estejam em cartaz.
SELECT
  *
FROM
  Movies AS m
    INNER JOIN
    BoxOffice AS b
      ON m.id = b.movie_id
    INNER JOIN
    Theater AS t
      ON m.theater_id = t.id
WHERE
  b.rating > 8;

-- Exercício 11: Utilizando o SELF JOIN , selecione os títulos e duração dos filmes que possuem o mesmo diretor.
SELECT
  m1.title AS 'Titulo 1',
  m1.length_minutes AS 'Duração 1',
  m2.title AS 'Titulo 2',
  m2.length_minutes AS 'Duração 2'
FROM
  Movies AS m1,
  Movies AS m2
WHERE
  m1.director = m2.director AND
  m1.id != m2.id;

-- Exercício 12: Faça duas buscas, uma utilizando SUBQUERY e outra utilizando INNER JOIN , que retornem o título dos filmes que arrecadaram 500 milhões ou mais, e que possuem duração maior que 110 minutos. 
SELECT
  title
FROM
  Movies
    INNER JOIN
    BoxOffice
      ON Movies.id = BoxOffice.movie_id
WHERE
  (international_sales + domestic_sales) >= 500000000 AND
  length_minutes > 110;

SELECT
  title
FROM
  Movies
WHERE
  length_minutes > 110 AND
  EXISTS
  (
    SELECT
      movie_id
    FROM
      BoxOffice
    WHERE
      Movies.id = BoxOffice.movie_id AND
      (international_sales + domestic_sales) >= 500000000
  );
