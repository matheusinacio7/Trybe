let piece = 'kNighT';

piece = piece.toLowerCase();

switch(piece) {
  case 'king':
    console.log('Any direction, one square.');
    break;
  case 'queen':
    console.log('Any straight line, any number of vacant squares.');
    break;
  case 'rook':
    console.log('Horizontal or vertical straight line, any number of vacant squares.');
    break;
  case 'bishop':
    console.log('Diagonals, any number of vacant squares.');
    break;
  case 'knight':
    console.log('Any 2->3 or 3->2 square, not necessarily vacant.');
    break;
  case 'pawn':
    console.log('Forward one square. Captures diagonally one square.');
    break;
  default:
    console.log('Not a chess piece.');
    break;
}