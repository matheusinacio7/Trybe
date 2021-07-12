// Faça uma lista com as suas frutas favoritas
const specialFruit = ['Uva', 'Morango', 'Melão'];

// Faça uma lista de complementos que você gostaria de adicionar
const additionalItens = ['Manga', 'Banana', 'Maçã'];

const fruitSalad = (fruit, additional) => {
  return [...fruit, ...additional];
};

console.log(fruitSalad(specialFruit, additionalItens));