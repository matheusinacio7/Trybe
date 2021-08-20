USE sakila;

-- Quantos pagamentos temos com a data de retorno 2005-05-25 ? Há múltiplas maneiras possíveis de encontrar a resposta.
SELECT
  COUNT(*)
  FROM payment

  WHERE
    DATE(payment_date) = '2005-05-25';

-- Quantos pagamentos foram feitos entre 01/07/2005 e 22/08/2005 ?
SELECT
  COUNT(*)
  FROM payment

  WHERE
    payment_date BETWEEN '2005-07-01' AND '2005-08-22';

-- Usando a tabela rental , extraia data, ano, mês, dia, hora, minuto e segundo dos registros com rental_id = 10330. Utilize a coluna rental_date para extrair as informações.
SELECT
  YEAR(rental_date) AS 'Ano',
  MONTH(rental_date) AS 'Mês',
  DAY(rental_date) AS 'Dia',
  HOUR(rental_date) AS 'Hora',
  MINUTE(rental_date) AS 'Minuto',
  SECOND(rental_date) AS 'Segundo'
  FROM rental

  WHERE
    rental_id = 10330;

-- Monte uma query que retorne todos os dados do pagamento feito no dia 28/07/2005 a partir das 22 horas .
SELECT
  *
  FROM payment

  WHERE
    DATE(payment_date) = '2005-07-28'
    AND HOUR(payment_date) >= 22;
