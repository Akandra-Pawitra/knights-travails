// Generate a chess board
const BOARD = [];
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    BOARD.push([j, i]);
  }
}

// randomly generate knight spawn and knight coordinate
const getCoor = function() {
  const x = Math.floor(Math.random() * 8);
  const y = Math.floor(Math.random() * 8);
  return [x, y];
};

const knightMoves = function(knight, target) {
  const START = BOARD[knight[0] + knight[1]*8];
  const FINISH = BOARD[target[0] + target[1]*8];
  const ROOT = {coor: START, prev: null};
  const TREE = [ROOT];
  const newNode = function(cell, parent) {
    const node = {coor: cell, prev: parent};
    TREE.push(node);
    return TREE.indexOf(node);
  };
  let [queue, moves, found, leaf] = [[ROOT], [], false];
  // check all possible moves until FINISH is reach
  while (!found) {
    for (let i = 0; i < queue.length; i++) {
      const parent = queue[i];
      const coor = parent.coor;
      const parentAddress = TREE.indexOf(parent);
      const x = coor[0];
      const y = coor[1];
      if (x-2 >= 0 && y-1 >= 0) {
        const ld = BOARD[(x-2) + (y-1)*8];
        const node = newNode(ld, parentAddress);
        moves.push(TREE[node]);
        if (ld === FINISH) {
          found = true;
          leaf = node;
        }
      };
      if (x-1 >= 0 && y-2 >= 0) {
        const dl = BOARD[(x-1) + (y-2)*8];
        const node = newNode(dl, parentAddress);
        moves.push(TREE[node]);
        if (dl === FINISH) {
          found = true;
          leaf = node;
        }
      }
      if (x+2 <= 7 && y-1 >= 0) {
        const rd = BOARD[(x+2) + (y-1)*8];
        const node = newNode(rd, parentAddress);
        moves.push(TREE[node]);
        if (rd === FINISH) {
          found = true;
          leaf = node;
        }
      }
      if (x+1 <= 7 && y-2 >= 0) {
        const dr = BOARD[(x+1) + (y-2)*8];
        const node = newNode(dr, parentAddress);
        moves.push(TREE[node]);
        if (dr === FINISH) {
          found = true;
          leaf = node;
        }
      }
      if (x-2 >= 0 && y+1 <= 7) {
        const lu = BOARD[(x-2) + (y+1)*8];
        const node = newNode(lu, parentAddress);
        moves.push(TREE[node]);
        if (lu === FINISH) {
          found = true;
          leaf = node;
        }
      }
      if (x-1 >= 0 && y+2 <= 7) {
        const ul = BOARD[(x-1) + (y+2)*8];
        const node = newNode(ul, parentAddress);
        moves.push(TREE[node]);
        if (ul === FINISH) {
          found = true;
          leaf = node;
        }
      }
      if (x+2 <= 7 && y+1 <= 7) {
        const ru = BOARD[(x+2) + (y+1)*8];
        const node = newNode(ru, parentAddress);
        moves.push(TREE[node]);
        if (ru === FINISH) {
          found = true;
          leaf = node;
        }
      }
      if (x+1 <= 7 && y+2 <= 7) {
        const ur = BOARD[(x+1) + (y+2)*8];
        const node = newNode(ur, parentAddress);
        moves.push(TREE[node]);
        if (ur === FINISH) {
          found = true;
          leaf = node;
        }
      }
    };
    if (found) {
      break;
    } else {
      queue = moves;
      moves = [];
      continue;
    }
  }
  // backtrack FINISH
  // leaf = address
  const PATH = [];
  let prevNode = TREE[leaf];
  let pointer = prevNode.prev;
  while (pointer !== null) {
    PATH.unshift(prevNode.coor);
    prevNode = TREE[pointer];
    pointer = prevNode.prev;
  }
  PATH.unshift(START);

  console.log(`=> You made it in ${PATH.length} moves! Here's your path:`);
  for (let i = 0; i < PATH.length; i++) console.log(PATH[i]);
};

const [knight, target] = [getCoor(), getCoor()];
console.log(knight, target);
knightMoves(knight, target);
