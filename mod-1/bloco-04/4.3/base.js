// exercicio 1

let n = 5;

for(let i = 0; i < n; i++) {
  let row = "";

  for(let j = 0; j < n; j++) {
    row += "*";
  }

  console.log(row);
}


// exercicio 2

n = 5;

for(let i = 0; i < n; i++) {
  let row = "";

  for(let j = 0; j < i + 1; j++) {
    row += "*";
  }

  console.log(row);
}


// exercicio 3

n = 5;

for(let i = 1; i <= n; i++) {
  let row = "";

  for(let j = 1; j <= n; j++) {
    if(j > (n - i)) {
      row += "*";
    } else {
      row += " ";
    }
  }
  console.log(row);
}


// exercicio 4

n = 5;

let rows = Math.ceil(n / 2);

for(let i = 0; i < rows; i++) {
  let row = "";
  let firstDot = rows - i;
  let lastDot = rows + i;

  for(let j = 1; j <= n; j++) {
    if(j >= firstDot && j <= lastDot) {
      row += "*";
    } else {
      row += " ";
    }
  }
  console.log(row);
}