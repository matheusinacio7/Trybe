Não normalizada:

| Funcionario\_id | Nome     | Sobrenome | Contato                  | Contato         | DataCadastro           | Setor                 |
| --------------- | -------- | --------- | ------------------------ | --------------- | ---------------------- | --------------------- |
| 12              | Joseph   | Rodrigues | jo@gmail.com             | (35)998552-1445 | 2020-05-05 08:50:25    | Administração, Vendas |
| 13              | André    | Freeman   | andre1990@gmail.com      | (47)99522-4996  | 5 de Fevereiro de 2020 | Operacional           |
| 14              | Cíntia   | Duval     | cindy@outlook.com        | (33)99855-4669  | 2020-05-05 10:55:35    | Estratégico, Vendas   |
| 15              | Fernanda | Mendes    | fernandamendes@yahoo.com | (33)99200-1556  | 2020-05-05 11:45:40    | Marketing             |


Normalizada:

| funcionario     |          |           |                          |     |             |                     |
| --------------- | -------- | --------- | ------------------------ | --- | ----------- | ------------------- |
| funcionario\_id | nome     | sobrenome | email                    | ddd | telefone    | data\_cadastro      |
| 12              | Joseph   | Rodriges  | ro@gmail.com             | 35  | 998552-1445 | 2020-05-05 08:50:25 |
| 13              | André    | Freeman   | andre1990@gmail.com      | 47  | 99522-4996  | 2020-02-05 00:00:00 |
| 14              | Cíntia   | Duval     | cindy@outlook.com        | 33  | 99855-4669  | 2020-05-05 10:55:35 |
| 15              | Fernanda | Mendes    | fernandamendes@yahoo.com | 33  | 99200-1556  | 2020-05-05 11:45:40 |


| setor     |               |
| --------- | ------------- |
| setor\_id | nome          |
| 1         | Administração |
| 2         | Estratégico   |
| 3         | Marketing     |
| 4         | Operacional   |
| 5         | Vendas        |


| funcionario\_setor |           |
| ------------------ | --------- |
| funcionario\_id    | setor\_id |
| 12                 | 1         |
| 12                 | 5         |
| 13                 | 4         |
| 14                 | 2         |
| 14                 | 5         |
| 15                 | 3         |


