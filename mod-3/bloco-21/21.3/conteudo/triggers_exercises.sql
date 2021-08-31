-- Crie um TRIGGER que, a cada nova inserção feita na tabela carros , defina o valor da coluna data_atualizacao para o momento do ocorrido, a acao para 'INSERÇÃO' e a coluna disponivel_em_estoque para 1 .
USE trybe_automoveis;

SHOW TABLES;

SELECT * FROM carros;
SELECT * FROM log_operacoes;

SHOW COLUMNS FROM carros;
SHOW COLUMNS FROM log_operacoes;

USE trybe_automoveis;

DELIMITER $$

CREATE TRIGGER update_action_on_self_and_log
  BEFORE INSERT ON carros
  FOR EACH ROW
BEGIN
  SET NEW.data_atualizacao = NOW(),
      NEW.acao = 'INSERT';
  INSERT INTO log_operacoes
      (tipo_operacao, data_ocorrido)
    VALUES
      ('INSERT', NOW());

END $$

CREATE TRIGGER initialize_stock
  BEFORE INSERT ON carros
  FOR EACH ROW
BEGIN
  SET NEW.disponivel_em_estoque = 1;
END $$

DELIMITER ;

INSERT INTO carros(preco)
  VALUES (1000.20);

-- Crie um TRIGGER que, a cada atualização feita na tabela carros , defina o valor da coluna data_atualizacao para o momento do ocorrido e a acao para 'ATUALIZAÇÃO' .

USE trybe_automoveis;

DELIMITER $$

CREATE TRIGGER update_update_action_on_self_and_log
  BEFORE UPDATE ON carros
  FOR EACH ROW
BEGIN
  SET NEW.data_atualizacao = NOW(),
      NEW.acao = 'ATUALIZACAO';

  INSERT INTO
    log_operacoes
      (tipo_operacao, data_ocorrido)
    VALUES
      ('ATUALIZACAO', NOW());
END $$

DELIMITER ;

UPDATE
  carros
SET
  preco = 2000
WHERE
  id_carro = 1;

-- Crie um TRIGGER que, a cada exclusão feita na tabela carros , envie para a tabela log_operacoes as informações do tipo_operacao como 'EXCLUSÃO' e a data_ocorrido como o momento da operação.

USE trybe_automoveis;

DELIMITER $$

CREATE TRIGGER add_delete_action_to_log
  AFTER DELETE ON carros
  FOR EACH ROW
BEGIN
  INSERT INTO log_operacoes
    (tipo_operacao, data_ocorrido) VALUES
    ('EXCLUSÃO', NOW());
END $$

DELIMITER ;

DELETE FROM
  carros
WHERE
  id_carro = 1;
