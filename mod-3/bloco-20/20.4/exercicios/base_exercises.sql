USE trybe_Pixar;

 -- Exercício 1 : Insira as produções da Pixar abaixo na tabela Movies :
/*
    Monstros SA, de Pete Docter, lançado em 2001, com 92 minutos de duração.
    Procurando Nemo, de John Lasseter, lançado em 2003, com 107 minutos de duração.
    Os Incríveis, de Brad Bird, lançado em 2004, com 116 minutos de duração.
    WALL-E, de Pete Docter, lançada em 2008, com 104 minutos de duração.
*/

SHOW TABLES;

SHOW COLUMNS FROM Movies;

INSERT INTO
    Movies(title, director, year, length_minutes)

    VALUES
      ('Monstros SA', 'Pete Docter', 2001, 92),
      ('Procurando Nemo', 'John Lasseter', 2003, 107),
      ('Os Incríveis', 'Brad Bird', 2004, 116),
      ('WALL-E', 'Pete Docter', 2008, 104);

SELECT * FROM Movies;

-- Exercício 2 : Procurando Nemo foi aclamado pela crítica! Foi classificado em 6.8, fez 450 milhões no mercado interno e 370 milhões no mercado internacional. Adicione as informações à tabela BoxOffice .
SHOW COLUMNS FROM BoxOffice;

INSERT INTO
    BoxOffice(movie_id, rating, domestic_sales, international_sales)

    VALUES
      (
        ( SELECT id
        FROM Movies
        WHERE title = 'Procurando Nemo')
        , 6.8, 450, 370);

-- Aqui eu coloquei o numero sem os milhoes, entao fiz um update para ajustar

UPDATE BoxOffice
  SET
    domestic_sales = 450000000,
    international_sales = 370000000

  WHERE
    movie_id = (
      SELECT id
      FROM Movies
      WHERE title = 'Procurando Nemo');

-- Exercício 3 : O diretor do filme "Procurando Nemo" está incorreto, na verdade ele foi dirigido por Andrew Staton. Corrija esse dado utilizando o UPDATE .
UPDATE Movies
  SET director = 'Andrew Staton'

  WHERE title = 'Procurando Nemo';


-- Exercício 4 : O título do filme "Ratatouille" esta escrito de forma incorreta na tabela Movies , além disso, o filme foi lançado em 2007 e não em 2010. Corrija esses dados utilizando o UPDATE .
SELECT * FROM Movies;

UPDATE Movies
  SET title = 'Ratatouille',
      year = 2007

  WHERE title = 'ratatui';

-- Exercício 5 : Insira as novas classificações abaixo na tabela BoxOffice , lembre-se que a coluna movie_id é uma foreign key referente a coluna id da tabela Movies :
/*
    Monsters SA, classificado em 8.5, lucrou 300 milhões no mercado interno e 250 milhões no mercado internacional.
    Os Incríveis, classificado em 7.4, lucrou 460 milhões no mercado interno e 510 milhões no mercado internacional.
    WALL-E, classificado em 9.9, lucrou 290 milhões no mercado interno e 280 milhões no mercado internacional.
*/
SHOW COLUMNS FROM BoxOffice;

INSERT INTO
    BoxOffice(movie_id, rating, domestic_sales, international_sales)

    VALUES
      (
        ( SELECT id
        FROM Movies
        WHERE title = 'Monsters SA')
        , 8.5, 300000000, 250000000),
      (
        ( SELECT id
        FROM Movies
        WHERE title = 'Os Incríveis')
        , 7.4, 460000000, 510000000),
      (
        ( SELECT id
        FROM Movies
        WHERE title = 'WALL-E')
        , 9.9, 290000000, 280000000);

SELECT * FROM BoxOffice;
SELECT * FROM Movies;

-- Aqui errei pois o exercicio diz "monsters SA" e na tabela temos "monstros SA"

UPDATE BoxOffice
  SET
    movie_id = (
      SELECT id
      FROM Movies
      WHERE title = 'Monstros SA')
  
  WHERE
    rating = 8.5
    AND domestic_sales = 300000000
    AND international_sales = 250000000;

-- Exercício 6 : Exclua da tabela Movies o filme "WALL-E".
DELETE FROM Movies
  WHERE title = 'WALL-E';

-- Exercício 7 : Exclua da tabela Movies todos os filmes dirigidos por "Andrew Staton". 
DELETE FROM Movies
  WHERE director = 'Andrew Staton';
