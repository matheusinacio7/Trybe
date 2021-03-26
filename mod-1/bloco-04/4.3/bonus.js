// exercicio 6

n = 7;

let rows = Math.ceil(n / 2);

for(let i = 0; i < rows; i++) {
  let row = "";
  let firstDot = rows - i;
  let lastDot = rows + i;

  for(let j = 1; j <= n; j++) {
    if(i == rows - 1 ){
      row += "*";
    } else if(j == firstDot || j == lastDot) {
      row += "*";
    } else {
      row += " ";
    }
  }
  console.log(row);
}