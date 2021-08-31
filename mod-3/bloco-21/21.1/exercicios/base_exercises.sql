USE trybe_hr;
SHOW TABLES;
-- 1. Escreva uma query que exiba o maior salário da tabela.
SHOW COLUMNS FROM jobs;
SELECT * FROM jobs;

SELECT
  MAX(MAX_SALARY) AS 'Salário Máximo'
FROM
  jobs;

-- 2. Escreva uma query que exiba a diferença entre o maior e o menor salário.
SELECT
  MAX(MAX_SALARY) - MIN(MIN_SALARY) AS 'Diferença'
FROM
  jobs;

-- 3. Escreva uma query que exiba a média salarial de cada JOB_ID , ordenando pela média salarial em ordem decrescente.
SELECT
  JOB_ID,
  AVG(MIN_SALARY + MAX_SALARY) AS 'media_salarial'
FROM
  jobs
GROUP BY
  JOB_ID
ORDER BY
  media_salarial DESC;

-- 4. Escreva uma query que exiba a quantidade de dinheiro necessária para realizar o pagamento de todas as pessoas funcionárias.
SELECT * FROM employees;

SELECT
  SUM(SALARY) AS 'payroll'
FROM
  employees;

-- 5. Escreva uma query que exiba quatro informações: o maior salário, o menor salário, a soma de todos os salários e a média dos salários. Todos os valores devem ser formatados para ter apenas duas casas decimais.
SELECT
  ROUND(MAX(SALARY), 2) AS 'Maior Salário',
  ROUND(MIN(SALARY), 2) AS 'Menor Salário',
  ROUND(SUM(SALARY), 2) AS 'Soma de Salários',
  ROUND(AVG(SALARY), 2) AS 'Média Salarial'
FROM
  employees;

-- 6. Escreva uma query que exiba a quantidade de pessoas que trabalham como pessoas programadoras ( IT_PROG ).
SELECT
  COUNT(*) AS 'Pessoas Programadoras'
FROM
  employees
WHERE
  JOB_ID = 'IT_PROG';

-- 7. Escreva uma query que exiba a quantidade de dinheiro necessária para efetuar o pagamento de cada profissão ( JOB_ID ).
SELECT
  JOB_ID,
  SUM(SALARY) AS 'Salário'
FROM
  employees
GROUP BY
  JOB_ID;

-- 8. Utilizando a query anterior, faça as alterações para que seja exibido somente a quantidade de dinheiro necessária para cobrir a folha de pagamento das pessoas programadoras ( IT_PROG ).
SELECT
  JOB_ID,
  SUM(SALARY) AS 'Salário'
FROM
  employees
WHERE
  JOB_ID = 'IT_PROG'
GROUP BY
  JOB_ID;

-- 9. Escreva uma query que exiba em ordem decrescente a média salarial de todos os cargos, exceto das pessoas programadoras ( IT_PROG ).
SELECT
  AVG(SALARY) AS media_salarial,
  JOB_ID
FROM
  employees
WHERE
  JOB_ID != 'IT_PROG'
GROUP BY
  JOB_ID
ORDER BY
  media_salarial DESC;

-- 10. Escreva um query que exiba média salarial e o número de funcionários de todos os departamentos com mais de dez funcionários. Dica: agrupe pelo department_id .
SHOW COLUMNS FROM departments;

SELECT
  DEPARTMENT_ID,
  AVG(SALARY) AS media_salarial,
  COUNT(*) AS 'funcionarios'
FROM
  employees
GROUP BY
  department_id
HAVING
  COUNT(*) > 10;

-- 11. Escreva uma query que atualize a coluna PHONE_NUMBER , de modo que todos os telefones iniciados por 515 agora devem iniciar com 777 .
UPDATE
  employees
SET
  PHONE_NUMBER = REPLACE(PHONE_NUMBER, '515', '777')
WHERE
  PHONE_NUMBER LIKE '515%';

-- 12. Escreva uma query que só exiba as informações dos funcionários cujo o primeiro nome tenha oito ou mais caracteres.
SELECT * FROM employees;

SELECT
  *
FROM
  employees
WHERE
  LENGTH(FIRST_NAME) >= 8;

-- 13. Escreva uma query que exiba as seguintes informações de cada funcionário: id , primeiro nome e ano no qual foi contratado (exiba somente o ano).
SELECT
  EMPLOYEE_ID AS 'id',
  FIRST_NAME AS 'primeiro_nome',
  YEAR(HIRE_DATE) AS 'ano_contratado'
FROM
  employees;

-- 14. Escreva uma query que exiba as seguintes informações de cada funcionário: id , primeiro nome e dia do mês no qual foi contratado (exiba somente o dia).
SELECT
  EMPLOYEE_ID AS 'id',
  FIRST_NAME AS 'primeiro_nome',
  DAY(HIRE_DATE) AS 'dia_contratado'
FROM
  employees;

-- 15. Escreva uma query que exiba as seguintes informações de cada funcionário: id , primeiro nome e mês no qual foi contratado (exiba somente o mês).
SELECT
  EMPLOYEE_ID AS 'id',
  FIRST_NAME AS 'primeiro_nome',
  MONTH(HIRE_DATE) AS 'mes_contratado'
FROM
  employees;

-- 16. Escreva uma query que exiba os nomes dos funcionários em letra maiúscula.
SELECT
  CONCAT(UPPER(FIRST_NAME), ' ', UPPER(LAST_NAME)) AS 'nome_completo'
FROM
  employees;

-- 17: Escreva uma query que exiba o sobrenome e a data de contratação de todos os funcionário contratados em julho de 1987.
SELECT
  LAST_NAME AS 'sobrenome',
  HIRE_DATE AS 'data_contratacao'
FROM
  employees
WHERE
  DATE(HIRE_DATE) = '1987-07-01';

-- 18: Escreva uma query que exiba as seguintes informações de cada funcionário: nome , sobrenome , tempo que trabalha na empresa (em dias) . 
SELECT
  FIRST_NAME AS 'nome',
  LAST_NAME AS 'sobrenome',
  (CURRENT_DATE() - HIRE_DATE) AS 'tempo_trabalho'
FROM
  employees;
