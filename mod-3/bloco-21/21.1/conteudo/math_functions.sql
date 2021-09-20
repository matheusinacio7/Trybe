-- Desafios com DIV e MOD
-- Dica: Números pares são aqueles que podem ser divididos em duas partes iguais. Ou seja, são aqueles cuja divisão por 2 retorna resto 0.

-- Monte uma query usando o MOD juntamente com o IF para descobrir se o valor 15 é par ou ímpar. Chame essa coluna de 'Par ou Ímpar' , onde ela pode dizer 'Par' ou 'Ímpar'.
SELECT
  IF(15 MOD 2 = 0, 'Par', 'Ímpar') AS 'Par ou Ímpar';

-- Temos uma sala de cinema que comporta 220 pessoas. Quantos grupos completos de 12 pessoas podemos levar ao cinema sem que ninguém fique de fora?
SELECT
  220 DIV 12 AS 'Grupos completos';

-- Utilizando o resultado anterior, responda à seguinte pergunta: temos lugares sobrando? Se sim, quantos?
SELECT
  220 MOD 12 AS 'Lugares sobrando';


-- Monte uma query que gere um valor entre 15 e 20 .
SELECT
  15 + RAND() * (20 - 15) AS 'Valor entre 15 e 20';

-- Monte uma query que exiba o valor arredondado de 15.7515971 com uma precisão de 5 casas decimais.
SELECT
  ROUND(15.7515971, 5) AS 'Valor arredondado';

-- Estamos com uma média de 39.494 de vendas de camisas por mês. Qual é o valor aproximado para baixo dessa média?
SELECT
  FLOOR(39.494) AS 'Valor aproximado para baixo';

-- Temos uma taxa de inscrição de 85.234% no curso de fotografia para iniciantes. Qual é o valor aproximado para cima dessa média?
SELECT
  CEIL(85.234) AS 'Valor aproximado para cima';
