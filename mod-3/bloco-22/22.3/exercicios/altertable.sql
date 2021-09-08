-- Escreva uma query SQL para alterar na tabela localtions o nome da coluna street_address para address , mantendo o mesmo tipo e tamanho de dados. 

USE trybe_hr;

SHOW COLUMNS FROM locations;

ALTER TABLE locations
  CHANGE STREET_ADDRESS ADDRESS
  VARCHAR(40);

-- Escreva uma query SQL para alterar o nome da coluna region_name para region , mantendo o mesmo tipo e tamanho de dados.

SHOW COLUMNS FROM regions;

ALTER TABLE regions
  CHANGE REGION_NAME REGION
  VARCHAR(25);

-- Escreva uma query SQL para alterar o nome da coluna country_name para country , mantendo o mesmo tipo e tamanho de dados.

SHOW COLUMNS FROM countries;

ALTER TABLE countries
  CHANGE COUNTRY_NAME COUNTRY
  VARCHAR(40);
