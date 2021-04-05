/*
  Conceitos que utilizei que ainda não foram vistos no curso:

    toString() e parseInt(): Funções que convertem para string e para int, veja nos links:
      https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
      https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    
    padStart: função que "preenche" o começo de uma string com a substring especificada
      https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/padStart


    Se você gostou da minha solução, dá um upvote lá no CodeWars :)
      https://www.codewars.com/kata/reviews/5f469e7a15fbdc00013120c1/groups/6062480053005000013a9e02
*/

function add(num1, num2) {
  let str1 = num1.toString();
  let str2 = num2.toString();
  
  let sum = '';

  str1 = str1.padStart(str2.length, '0');
  str2 = str2.padStart(str1.length, '0');

  for(let i = 0; i < str1.length; i++) {
    let algarismSum = parseInt(str1[i]) + parseInt(str2[i]);

    sum += algarismSum;
  }
 
  return parseInt(sum);
}


console.log(add(122, 81));