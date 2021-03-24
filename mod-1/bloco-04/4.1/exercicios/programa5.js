let angle1 = 95;
let angle2 = 40;
let angle3 = 45;

let soma = angle1 + angle2 + angle3;

if(angle1 < 0 || angle1 > 180 ||
  angle2 < 0 || angle2 > 180 ||
  angle3 < 0 || angle3 > 180) {
    console.log("Todos os ângulos de um triângulo devem ser maiores que 0 e menores que 180.");
} else if(soma == 180) {
  console.log("Os ângulos formam um triângulo!");
} else {
  console.log("Os ângulos não formam um triângulo.");
}