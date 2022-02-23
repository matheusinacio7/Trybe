// Exercício 3 O código abaixo está em JavaScript . Calcule sua ordem de complexidade para um array de tamanho n .

// const numbers = [0,1,2,3,4,5,6,7,8,9]
// numbers.map(n => n*n)

// Complexidade de tempo: O(n). Espaço: O(n)

//  Exercício 4 O código abaixo está em JavaScript . Calcule sua ordem de complexidade para um array de tamanho n . 

// const numbers = [0,1,2,3,4,5,6,7,8,9]
// numbers.map(n => n*n)
// .filter(n => n%2 === 0)
// .reduce((acc, n) => acc + n)

// Complexidade de tempo: O(n^3). Espaço: O(n)

// Resposta: na verdade é O(n). O algoritmo não percorre o array 3x para cada elemento, em cada array. Apenas 3x o array inteiro. Então seria O(3n)
