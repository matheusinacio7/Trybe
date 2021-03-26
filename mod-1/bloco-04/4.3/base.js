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