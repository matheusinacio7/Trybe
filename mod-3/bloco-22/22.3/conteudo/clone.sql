-- Faça o seguinte: Clone alguma tabela do banco de dados sakila para ver na prática o resultado do comando acima. 

USE sakila;

SHOW TABLES;

CREATE TABLE customer_clone LIKE customer;

SHOW COLUMNS FROM customer_clone;
