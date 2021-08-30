
-- Eu fiz uma pequena alteração para ter o operador (operator) também na tabela de logs.


-- Crie um Trigger para INSERT que deve definir o valor do campo release_year da tabela movies como o ano atual de forma dinâmica, sem haver a necessidade de digitar manualmente o valor do ano. Além disso, crie um outro Trigger para INSERT que adiciona um novo registro na tabela movies_logs , informando o movie_id do filme que acaba de ser inserido na tabela movies , a executed_action como 'INSERT' e a log_date como a data atual.
USE trybe_BeeMovies;

SHOW TABLES;

SHOW COLUMNS FROM movies;

SHOW COLUMNS FROM movies_logs;

SELECT * FROM movies;

SELECT * FROM movies_logs;

USE trybe_BeeMovies;

DELIMITER $$

CREATE TRIGGER on_insert_set_release_year
  BEFORE INSERT ON movies
  FOR EACH ROW
BEGIN
  SET NEW.release_year = YEAR(NOW());
END $$

CREATE TRIGGER on_insert_log_operation
  AFTER INSERT ON movies
  FOR EACH ROW
BEGIN
  INSERT INTO movies_logs
    (movie_id, executed_action, log_date, operator) VALUES
    (NEW.movie_id, 'INSERT', NOW(), USER());
END $$

DELIMITER ;

INSERT INTO movies
  (ticket_price, ticket_price_estimation) VALUES
  (10.29, NULL);

-- Crie um Trigger para UPDATE que, ao receber uma alteração na tabela movies , deve comparar o valor anterior de ticket_price com o valor sendo inserido nesta atualização. Caso o valor seja maior que o anterior, insira na coluna ticket_price_estimation o valor de 'Increasing' . Caso contrário, insira o valor 'Decreasing' . Adicionalmente, insira um novo registro na tabela movies_logs , contendo informações sobre o registro alterado ( movie_id , executed_action e log_date ).

INSERT INTO movies
  (ticket_price, ticket_price_estimation) VALUES
  (9.98, NULL),
  (11.34, NULL),
  (7.49, NULL);

USE trybe_BeeMovies;

DELIMITER $$

CREATE TRIGGER on_update_register_estimation
  BEFORE UPDATE ON movies
  FOR EACH ROW
BEGIN
  SET
    NEW.ticket_price_estimation = IF(NEW.ticket_price > OLD.ticket_price, 'INCREASING', 'DECREASING');
END $$

CREATE TRIGGER on_update_log_operation
  AFTER UPDATE ON movies
  FOR EACH ROW
BEGIN
  INSERT INTO movies_logs
    (movie_id, executed_action, log_date, operator) VALUES
    (NEW.movie_id, 'UPDATE', NOW(), USER());
END $$

DELIMITER ;

UPDATE
  movies
SET
  ticket_price = (
    CASE
      WHEN movie_id = 1 THEN 19.98
      WHEN movie_id = 2 THEN 14.35
      WHEN movie_id = 3 THEN 4.98
    END
  )
WHERE
  movie_id IN (1, 2, 3);

-- Crie um Trigger na tabela movies que, ao ter algum de seus registros excluídos, deve enviar uma informação para a tabela movies_logs , onde devem ser guardados a data da exclusão, a executed_action 'DELETE' e o id do filme excluído.

USE trybe_BeeMovies;

DELIMITER $$

CREATE TRIGGER on_delete_log_operation
  AFTER DELETE ON movies
  FOR EACH ROW
BEGIN
  INSERT INTO movies_logs
    (movie_id, executed_action, log_date, operator) VALUES
    (OLD.movie_id, 'DELETE', NOW(), USER());
END $$

DELIMITER ;

DELETE FROM
  movies
WHERE
  movie_id = 2;
