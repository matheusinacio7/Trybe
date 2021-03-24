let percentGrade = 87;


if (percentGrade > 100 || percentGrade < 0) {
  console.error('Percentage of grade must be equal or greater than 0 and lower than 100');
} else if (percentGrade >= 90) {
  console.log('A');
} else if (percentGrade >= 80) {
  console.log('B');
} else if (percentGrade >= 70) {
  console.log('C');
} else if (percentGrade >= 60) {
  console.log('D');
} else if (percentGrade >= 50) {
  console.log('E');
} else {
  console.log('F');
}