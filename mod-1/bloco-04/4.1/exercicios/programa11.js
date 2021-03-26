let salarioBruto = 3000;

let INSS;
let IR;

if(salarioBruto <= 1556.94) {
  INSS = salarioBruto * 0.08;
} else if(salarioBruto <= 2594.92) {
  INSS = salarioBruto * 0.09;
} else if(salarioBruto <= 5189.82) {
  INSS = salarioBruto * 0.11;
} else {
  INSS = 570.88;
}

let salarioBase = salarioBruto - INSS;

if(salarioBase <= 1903.98) {
  IR = 0;
} else if(salarioBase <= 2826.65) {
  IR = salarioBase * 0.075 - 142.80;
} else if(salarioBase <= 3751.05) {
  IR = salarioBase * 0.15 - 354.80;
} else if(salarioBase <= 4664.68) {
  IR = salarioBase * 0.225 - 636.13;
} else {
  IR = salarioBase * 0.275 - 869.36;
}

let salarioLiquido = salarioBase - IR;

console.log(salarioLiquido);