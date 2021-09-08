DROP DATABASE IF EXISTS trybe_normalization;

CREATE DATABASE trybe_normalization;

USE trybe_normalization;

CREATE TABLE funcionario(
  funcionario_id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(40) NOT NULL,
  sobrenome VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  ddd CHAR(2) NOT NULL,
  telefone CHAR(11) NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDb;

INSERT INTO funcionario
  (funcionario_id, nome, sobrenome, email, ddd, telefone, data_cadastro) VALUES
  (12, 'Joseph', 'Rodrigues', 'ro@gmail.com', '35', '998552-1445', TIMESTAMP('2020-05-05 08:50:25')),
  (13, 'André', 'Freeman', 'andre1990@gmail.com', '47', '99522-4996', TIMESTAMP('2020-02-05 00:00:00')),
  (14, 'Cíntia', 'Duval', 'cindy@outlook.com', '33', '99855-4669', TIMESTAMP('2020-05-05 10:55:35')),
  (15, 'Fernanda', 'Mendes', 'fernandamendes@yahoo.com', '33', '99200-1556', TIMESTAMP('2020-05-05 11:45:40'));

CREATE TABLE setor(
  setor_id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(20) NOT NULL
) ENGINE=InnoDb;

INSERT INTO setor
  (nome) VALUES
  ('Administração'),
  ('Estratégico'),
  ('Marketing'),
  ('Operacional'),
  ('Vendas');

CREATE TABLE funcionario_setor(
  funcionario_id INT NOT NULL,
  setor_id INT NOT NULL,

  CONSTRAINT PRIMARY KEY (funcionario_id, setor_id),

  FOREIGN KEY (funcionario_id) REFERENCES funcionario(funcionario_id),
  FOREIGN KEY (setor_id) REFERENCES setor(setor_id)
) ENGINE=InnoDb;

INSERT INTO funcionario_setor
  (funcionario_id, setor_id) VALUES
  (12, 1),
  (12, 5),
  (13, 4),
  (14, 2),
  (14, 5),
  (15, 3);
