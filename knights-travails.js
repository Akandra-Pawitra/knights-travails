// Generate a chess board
const BOARD = [];
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const cell = {
      coor: [j, i],
      top: null,
      right: null,
      bottom: null,
      left: null,
    };
    BOARD.push(cell);
  }
}

// Link each cell to another to form a graph
for (let i = 0; i < BOARD.length; i++) {
  const x = BOARD[i].coor[0];
  const y = BOARD[i].coor[1];
  if (x !== 0) {
    BOARD[i].left = i - 1;
  }
  if (x !== 7) {
    BOARD[i].right = i + 1;
  }
  if (y !== 0) {
    BOARD[i].bottom = i - 8;
  }
  if (y !== 7) {
    BOARD[i].top = i + 8;
  }
}

// randomly generate knight spawn and knight coordinate
const getCoor = () => {
  const x = Math.floor(Math.random() * 8);
  const y = Math.floor(Math.random() * 8);
  return [x, y];
};

const knight = getCoor();
const target = getCoor();
console.log(knight, target);
