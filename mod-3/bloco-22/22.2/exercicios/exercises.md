Exercício 1: Converta a tabela desnormalizada abaixo para a 1ª Forma Normal. 

| residencia\_id | residencia\_locador | tipo        | endereco                              | inquilinos                |
| -------------- | ------------------- | ----------- | ------------------------------------- | ------------------------- |
| 1              | Doren Fatima        | casa        | Rua Norte Sul, 35, Belo Horizonte, MG | João, Mária, Carlos       |
| 2              | Ramon Jonathan      | apartamento | Av Rodrigues Ramos, 950 Salvador, BA  | Sebastião, Alfredo        |
| 3              | Vanderson Judis     | apartamento | Rua Brusque 352, Ipatinga, MG         | Marta, Marizete           |
| 4              | Carolina Rude       | casa        | Av Atlantica, 254, Camboriú, SC       | Letice, Laísa, Bartolomeu |


RESPOSTA

| residencia     |               |                    |             |                    |        |                |               |
| -------------- | ------------- | ------------------ | ----------- | ------------------ | ------ | -------------- | ------------- |
| residencia\_id | locador\_nome | locador\_sobrenome | tipo        | rua                | numero | cidade         | estado\_sigla |
| 1              | Doren         | Fatima             | casa        | Rua Norte Sul      | 35     | Belo Horizonte | MG            |
| 2              | Ramon         | Jonathan           | apartamento | Av Rodrigues Ramos | 950    | Salvador       | BA            |
| 3              | Vanderson     | Judis              | apartamento | Rua Brusque        | 352    | Ipatinga       | MG            |
| 4              | Carolina      | Rude               | casa        | Av Atlantica       | 254    | Camboriú       | SC            |

| inquilino     |            |                |
| ------------- | ---------- | -------------- |
| inquilino\_id | nome       | residencia\_id |
| 1             | João       | 1              |
| 2             | Mária      | 1              |
| 3             | Carlos     | 1              |
| 4             | Sebastião  | 2              |
| 5             | Alfredo    | 2              |
| 6             | Marta      | 3              |
| 7             | Marizete   | 3              |
| 8             | Letice     | 4              |
| 9             | Laísa      | 4              |
| 10            | Bartolomeu | 4              |


---


Exercício 2: Converta a tabela desnormalizada abaixo (que já está nos padrões da 1ª Forma Normal) para a 2ª Forma Normal. 

| heroi\_id | heroi        | liga           | universo | criador     | criador\_idade |
| --------- | ------------ | -------------- | -------- | ----------- | -------------- |
| 1         | Homem Aranha | Avengers       | Marvel   | Stan Lee    | 95             |
| 2         | Jean Grey    | X-Men          | Marvel   | Gardner Fox | 75             |
| 3         | Flash        | Justice League | DC       | Bill Finger | 60             |
| 4         | Batman       | Justice League | DC       | Len Wein    | 69             |


RESPOSTA

Segunda forma normal apenas é válida para tabelas com chave primária composta.
Ou, ainda, pode-se dizer que qualquer tabela que esteja na primeira forma normal e tem chave primária simples já está na segunda forma normal.

---

Exercício 3: Agora, converta essa outra tabela (que já está nos moldes das duas primeiras formas) para a 3ª Forma Normal. 

| filme\_id | genero\_id | genero             | valor\_entrada |
| --------- | ---------- | ------------------ | -------------- |
| 1         | 1          | Ação               | 27,9           |
| 2         | 2          | Biográfico         | 30,7           |
| 3         | 2          | Biográfico         | 26,25          |
| 4         | 3          | Comédia            | 17,8           |
| 5         | 4          | Drama              | 21,5           |
| 6         | 4          | Drama              | 18             |
| 7         | 5          | Comédia romântica  | 15,75          |


RESPOSTA

| filme     |            |                |
| --------- | ---------- | -------------- |
| filme\_id | genero\_id | valor\_entrada |
| 1         | 1          | 27,9           |
| 2         | 2          | 30,7           |
| 3         | 2          | 26,25          |
| 4         | 3          | 17,8           |
| 5         | 4          | 21,5           |
| 6         | 4          | 18             |
| 7         | 5          | 15,75          |

| genero     |                   |
| ---------- | ----------------- |
| genero\_id | nome              |
| 1          | Ação              |
| 2          | Biográfico        |
| 3          | Comédia           |
| 4          | Drama             |
| 5          | Comédia romântica |
